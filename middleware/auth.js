const auth=(req,res,next)=>{
    if(req.session.user)
    {
        console.log(req.session)
        next()
    }
    else{
        res.sendStatus(403)
    }
}
const authAdmin=(req,res,next)=>{
    if(req.session.user.isAdmin)
    {
        console.log(req.session)
        next()
    }
    else{
        res.sendStatus(403)
    }
}

module.exports={authAdmin,auth}