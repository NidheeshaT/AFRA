const {matchFace}=require("../faceAPI/api")
const Course=require("../models/Course")

const {auth}=require('../middleware/auth')
const router = require("./auth")
const Student = require("../models/Student")

router.use(auth)
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

router.post("/getVerification",async(req,res)=>{
    try{

        const code=req.body.code;
    
        let images;
    
        Object.values(req.files).map(file => {
            images=file.tempFilePath
        });
    
        let faces = await Course.returnFaces(code);
        const matches=await matchFace(faces,images)
    
        res.send(matches)
    }
    catch(e){
        e.sendStatus(500)
    }
})

router.post("/getCourse",async(req,res)=>{
    try{

        const code=req.body.code;
        let course = await Course.getInfo(code);
    
        res.send(course)
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }
})

router.post("/getStudent",async(req,res)=>{
    try{

        const usn=req.body.usn;
        let student = await Student.getStudent(usn);
        console.log(student)
        res.send(student)
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }
})

module.exports=router