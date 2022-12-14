const {Router}=require("express")
const Student=require("../models/Student")
const Course=require("../models/Course")
const {getDes}=require("../faceAPI/api")
const {authAdmin}=require('../middleware/auth')
const fs=require('fs')
const path = require("path")
const router=Router()

router.use(authAdmin)
router.post("/addStudent",async(req,res)=>{
    const student=req.body;
    let images=[];
    Object.values(req.files).map(file => {
        images.push(file.tempFilePath)
    });


    const des=await getDes(images)

    student['descriptions']=des

    const data=await Student.create(student)

    res.send(data)

})


router.post("/addFace",async(req,res)=>{
    const usn=req.body.usn;
    let images=[];

    Object.values(req.files).map(file => {
        images.push(file.tempFilePath)
    });

    const des=await getDes(images)

    const flag=await Student.addface(usn,des)

    res.send({flag:flag})
})

router.post("/addCourse",async(req,res)=>{
    const course=req.body;
    try{

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