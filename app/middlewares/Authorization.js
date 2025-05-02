const authorization=(premittedRoles)=>{
    return(req,res,next)=>{
        if(premittedRoles.includes(req.role)){
            next()
        }else{
            return res.status(403).json({errors:"Unauthorized Access denied"})
        }
    }
}