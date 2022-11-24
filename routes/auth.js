const {Router, application}=require("express")
const Admin=require("../models/admin")
const Enroller=require("../models/Enroller")

const router=Router()
// Admin.addAdmin({id:"rickroll",password:"password",name:"your daddy"})
router.post('/admin',async (req,res)=>{
    let id=req.body.id;
    let password=req.body.password;
    let admin=await Admin.getAdmin(id,password)
    if(admin)
    {
        res.send(admin)
        return
    }
    res.sendStatus(404)
})

router.post('/login',(req,res)=>{
    let id=req.body.id;
    let password=req.body.password;

})


router.post('/register',(req,res)=>{
    
})
module.exports=router