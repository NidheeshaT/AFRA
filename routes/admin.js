const {Router}=require("express")
const Student=require("../models/Student")
const Course=require("../models/Course")
const {getDes}=require("../faceAPI/api")
const {authAdmin}=require('../middleware/auth')
const fs =require('fs')

const router=Router()


router.use(authAdmin)
router.post("/addStudent",async(req,res)=>{
    try{

        const student=req.body;
        let images=[];
        Object.values(req.files).map(file => {
            images.push(file.tempFilePath)
        });
        console.log(req.files)

        const des=await getDes(images)
        if(des)
        {
            let image=Object.values(req.files)[0]
    
            student['descriptions']=des
        
            const data=await Student.addStudent(student,image)
            if(data){
                res.send(data)
            }
            else{
                res.sendStatus(400)
            }       
        }
        else{
            res.sendStatus(400)
        }
    
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }
    clean(req)
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
    clean(req)
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


const clean=(req)=>{
    try{
        Object.values(req.files).map(file => {
                fs.unlink(file.tempFilePath,()=>{})
        });
    }
    catch(e)
    {
        console.log(e.message)
    }
}

module.exports=router