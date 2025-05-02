import User from "../models/userModel.js";
import { validationResult } from "express-validator";
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
export default userCtrl