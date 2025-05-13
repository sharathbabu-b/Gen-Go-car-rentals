import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import sendEmail from "../../utils/nodemailer.js";
import crypto from "crypto"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const userCtrl={}
userCtrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const {name,email,password,phone,role}=req.body
    try{
        const totaluser=await User.countDocuments()
        const user=new User({name,email,password,phone,role})
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(password,salt)
        user.password=hashPassword
        if(totaluser==0){
            user.role="admin"
            user.isActive="true"

        }
        await user.save()
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Registration failed"})
    }

}
userCtrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})

    }
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({errors:"Invalid email/ password"})
        }
        const isVerified=await bcryptjs.compare(password,user.password)
        if(!isVerified){
            return res.status(404).json({errors:'invalid password'})
        }
        const tokenData={userId:user._id,role:user.role}
        const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"7d"})
        res.json({token:`Bearer ${token}`})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Login failed"})

    }

}
userCtrl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const {name,email,password}=req.body
    try{
        if(id==req.userId){
            const user=await User.findByIdAndUpdate(id,{name,email,password},{new:true})
            return res.status(201).json(user)
        }
        res.json({error:'cannot update this account user is invalid'})
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
    
}
userCtrl.delete=async(res,req)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    try{
        if(id==req.userId || req.role=="admin"){
            const user=await User.findByIdAndDelete(id)
            return res.json(user)
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(403).json({message:"User deleted successfully", user })
        }else{
            return res.status(403).json({ message: "Unauthorized to delete this user" })
        }
    
    }catch(err){
        console.log(err)
        res.status(500).json({errors:"something went wrong"})
    }

}
userCtrl.account=async(req,res)=>{
    try{
        const user=await User.findById(req.userId)
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }

}
// forgot password
userCtrl.forgotPassword=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const token=crypto.randomBytes(32).toString('hex')
        user.resetPasswordToken=token
        user.resetPasswordExpires=Date.now()+600000
        await user.save()
        const resetLink=`${process.env.FRONTEND_URL}/reset-password/${token}`
        const message=`We have received a reset password request. Please use the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 10 minutes.`
        console.log(user.email)
        await  sendEmail({email:user.email,message:message})
        res.json({message:'Password reset link sent to email',resetLink})
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Something went wrong' })
    }
}
userCtrl.resetPassword=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const {token}=req.params
    const {password,confirmPassword}=req.body
    try{
        if(password!==confirmPassword){
            return res.status(400).json({errors:"Password do not match"})
        }
        const user=await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()}  
        })
        if(!user){
            return res.status(400).json({errors:"invalid or expired token"})
        }
        const salt=await bcryptjs.genSalt()
        user.password=await bcryptjs.hash(password,salt)
        user.resetPasswordToken=undefined
        user.resetPasswordExpires=undefined
        await user.save()
        await sendEmail({
            email:user.email,
            message:"Your password was successfully reset. If you didn’t do this, contact support immediately."
        });
        res.json({message:"Password reset successful"})
    }catch(err){
        console.log(err)
        res.status(500).json({error:"something went wrong"})

    }
}
userCtrl.UpdateActivation=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const {isActive}=req.body
    try{
        const user=await User.findByIdAndUpdate(id,{isActive},{new:true})
        res.json(user)
       
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Error updating activation'})
    }
}
userCtrl.allusers=async(req,res)=>{
    try{
        const users=await User.find()
         res.json(users)
    }catch(err){
        res.status(500).json({errors:"something went wrong"})
    }
}
export default userCtrl