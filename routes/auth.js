const {Router, application}=require("express")
const Admin=require("../models/admin")
const Enroller=require("../models/Enroller")

const router=Router()
// Admin.addAdmin({id:"nagaraj",password:"nidheesha",name:"Admin"})
router.post('/admin',async (req,res)=>{
    try{

        let id=req.body.id;
        let password=req.body.password;
        let admin=await Admin.getAdmin(id,password)
        if(admin)
        {
            res.send(admin)
            return
        }
        else{
            res.send({error:"Incorrect password or username"})
        }
    }
    catch(e)
    {
        console.log(e)
    }
    res.sendStatus(404)
})

router.post('/login',async(req,res)=>{
    try{

        let id=req.body.id;
        let password=req.body.password;
        let enroller=await Admin.getEnroller(id,password)
        if(enroller)
        {
            res.send(enroller)
            return
        }
        else{
            res.send({error:"Incorrect password or username"}).sendStatus(401)
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
            res.send({status:success})
        }
        else{
            res.sendStatus(400).send({error:"Bad request"})
        }
    }
    catch(e)
    {
        console.log(e)
        res.sendStatus(500)
    }
})

module.exports=router