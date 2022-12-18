const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const {faceapi}=require('./faceAPI/api')
require('dotenv').config()

const app = express();
const cors=require("cors")
app.use(cors(  {
    origin: 'http://localhost:3000',
    // (origin,callback)=>{return callback(null,true)},
    credentials:true
  }))

const sessionConnection=require("./db/connect")
const authRouter=require("./routes/auth")
const adminRouter=require("./routes/admin")
const enrollerRouter=require("./routes/enroller");


app.use(express.static('upload'))
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(sessionConnection)
app.use(express.json())

app.use(authRouter)
app.use(enrollerRouter)
app.use(adminRouter)

app.listen(process.env.PORT || 80);