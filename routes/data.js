const {Router}=require("express")
const Student=require("../models/Student")
const Course=require("../models/Course")
const {getDes,matchFace}=require("../faceAPI/api")
const { default: mongoose } = require("mongoose")

const router=Router()

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

router.post("/enrollStudents",async(req,res)=>{
    const usn=req.body.usn;
    const code=req.body.code;

    try{

        const data=await Course.addStudents(code,usn)
        if(data)
            res.send("student added successfully")
        else
            res.send("cant add student")
    }
    catch(e)
    {
        console.log(e)
        res.sendStatus(500)
    }
})

router.post("/compareStudents",async(req,res)=>{
    const code=req.body.code;

    let images;

    Object.values(req.files).map(file => {
        images=file.tempFilePath
    });

    let faces = await Course.returnFaces(code);
    const matches=await matchFace(faces,images)

    res.send(matches)
})
module.exports=router