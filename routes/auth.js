const {Router}=require("express")
const Admin=require("../models/admin")
const Enroller=require("../models/Enroller")

const router=Router()
// Admin.addAdmin({id:"admin",password:"admin",name:"Admin"})
router.get('/',async(req,res)=>{
    if(req.session.user && req.session.user.isAdmin)
    {
        res.send(req.session.user)
        return
    }
    res.send(false)
})
router.post('/admin',async (req,res)=>{
    try{
        if(req.session.user && req.session.user.isAdmin)
        {
            res.send(req.session.user)
            return
        }
        let id=req.body.id;
        let password=req.body.password;
        let admin=await Admin.getAdmin(id,password)
        if(admin)
        {
            req.session.user=admin
            res.send(admin)
            return
        }
        res.status(400).send({error:"Incorrect password or username"})
    }
    catch(e)
    {
        console.log(e)
        res.sendStatus(404)
    }
})

router.post('/login',async(req,res)=>{
    try{
        if(req.session.user && req.session.user.isAdmin)
        {
            res.send(req.session.user)
            return
        }
        let id=req.body.id;
        let password=req.body.password;
        let enroller=await Enroller.getEnroller(id,password)
        if(enroller)
        {
            req.session.user=enroller
            res.send(enroller)
            return
        }
        else{
            res.status(401).send({error:"Incorrect password or username"})
        }
    }
    catch(e)
    {
        console.log(e)
        res.sendStatus(500)
    }

})


router.post('/register',async (req,res)=>{
    try{
        const status=await Enroller.addEnroller(req.body)
        if(status)
        {
            res.send({status:true,message:"registered successfully"})
            return
        }
        
        res.sendStatus(400)
    }
    catch(e)
    {
        console.log(e.message)
        res.status(500).send({status:false,message:e.message})
    }
})


router.get('/logout',async(req,res)=>{
    try{
        req.session.destroy()
        res.send({success:true,message:"logged out"})
    }
    catch{
        res.send({success:false,message:"Bad request"})
    }
})
module.exports=router