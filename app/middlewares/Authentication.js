import jwt from "jsonwebtoken"
export default function authenticationUser(res,req,next){
    const token=req.headers["authorization"];
    // const token=authHeader && authHeader.split("")[1]
    if(!token){
        return res.status(401).json({message:"Acess denied.No token provided"})
    }
    try{
        const token=token.split(' ')[1]
        const tokenData=jwt.verify(token,process.env.SECRET_KEY)
        req.userId=tokenData.userId
        req.role=tokenData.role
        next()
    }catch(err){
        res.status(403).json({message:"Invalid token"})
    }

}