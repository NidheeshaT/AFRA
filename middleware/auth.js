const auth=(req,res,next)=>{
    if(req.session.user)
    {
        next()
    }
    else{
        res.sendStatus(403)
    }
}
const authAdmin=(req,res,next)=>{
    if(req.session.user.isAdmin)
    {
        next()
    }
    else{
        res.sendStatus(403)
    }
}

module.exports={authAdmin,auth}