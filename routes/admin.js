const {Router}=require("express")
const Student=require("../models/Student")
const Course=require("../models/Course")
const {getDes}=require("../faceAPI/api")
const {authAdmin}=require('../middleware/auth')
const { randomUUID } = require("crypto")
const router=Router()


router.use(authAdmin)
router.post("/addStudent",async(req,res)=>{
    try{

        const student=req.body;
        let images=[];
        Object.values(req.files).map(file => {
            images.push(file.tempFilePath)
        });
        let image=Object.values(req.files)[0]
    
        const stored=randomUUID().substring(0,10)+image.name
        const uploadPath='./upload/'+stored
        if(image.mimetype==='image/jpeg'||image.mimetype==='image/jpg'||image.mimetype==='image/png')
        {
            image.mv(uploadPath)
        }
    
        student.image=stored
        const des=await getDes(images)
        if(des)
        {

            student['descriptions']=des
        
            const data=await Student.addStudent(student)
            if(data){
                res.send(data)
                return
            }
                
        }
        res.sendStatus(400)
    
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }

})


router.post("/addFace",async(req,res)=>{
    try{

        const usn=req.body.usn;
        let images=[];
    
        Object.values(req.files).map(file => {
            images.push(file.tempFilePath)
        });
    
        const des=await getDes(images)
    
        const flag=await Student.addFace(usn,des)
    
        res.send({flag:flag})
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }
})

router.post("/addCourse",async(req,res)=>{
    try{
        const course=req.body;

        const data=await Course.create(course)
    
        res.send("data added successfully")
    }
    catch(e)
    {
        console.log(e)

        res.status(403).send("duplication error")
    }
})


module.exports=router