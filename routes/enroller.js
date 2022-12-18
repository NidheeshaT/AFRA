const {matchFace}=require("../faceAPI/api")
const Course=require("../models/Course")
const fs =require('fs')
const {auth}=require('../middleware/auth')
const router = require("./auth")
const Student = require("../models/Student")
const getURL = require("../ulilities/gsheets")
const cache = require("../ulilities/cache")

router.use(auth)
router.post("/enrollStudent",async(req,res)=>{
    
    try{
        
        const usn=req.body.usn;
        const code=req.body.code;
        const data=await Course.addStudents(code,usn)
        if(data)
            res.send({message:"student added successfully"})
        else
            res.send({message:"cant add student"})

        if(cache.code===code)
        {
            cache.code=''
        }
    }
    catch(e)
    {
        console.log(e)
        res.sendStatus(500)
    }
})

router.post("/verify",async(req,res)=>{
    try{
        console.log("sdj")
        const code=req.body.code;
    
        let images;
    
        Object.values(req.files).map(file => {
            images=file.tempFilePath
        });
        let faces;
        if(cache.code!==code)
        {
            faces = await Course.returnFaces(code);

        }
        else{
            faces=cache.faces
        }
        const matches=await matchFace(code,faces,images)
        Course.addAttendance(code,matches);

        res.send(matches)
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }
    clean(req)
})

router.post("/getCourse",async(req,res)=>{
    try{

        const code=req.body.code;
        const course = await Course.getInfo(code);
        if(course)
            res.send(course)
        else
            res.sendStatus(404)
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }

})

router.post("/getStudents",async(req,res)=>{
    try{

        const usns=req.body.usns;
        let students=[]
        console.log(usns)
        for(let i=0;i<usns.length;i++)
        {

            students.push(await Student.getStudent(usns[i]));
        }
        console.log(students)
        res.send(students)
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
    }
})

router.post("/getAttendance",async(req,res)=>{
    try{

        const code=req.body.code;
        let courseAttendance = await Course.returnAttendance(code);
        let url=await getURL({code:code,enrolled:courseAttendance})
        if(url.url)
        {
            res.send({url:url})
        }
        else{
            res.sendStatus(500)
        }
    }
    catch(e)
    {
        console.log(e.message)
        res.sendStatus(500)
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

router.post("/verifywithDes",async(req,res)=>{
    try{

        const code=req.body.code;
        const detections=req.body.detections;
        let faces;
        if(cache.code!==code)
        {
            faces = await Course.returnFaces(code);

        }
        else{
            faces=cache.faces
        }
        mat
        const matches=await matchFaceDes(code,faces,images)
        Course.addAttendance(code,matches);

        res.send(matches)
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }
})



module.exports=router