const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const {faceapi}=require('./faceAPI/api')

const app = express();
const authRouter=require("./routes/auth")
const dataRouter=require("./routes/data")

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json())

app.use(authRouter)
app.use(dataRouter)


mongoose
.connect('mongodb://localhost:27017/AFRA',).then(() => {
    app.listen(process.env.PORT || 80);
    console.log("DB connected and server us running.");
  })
  .catch((err) => {
    console.log(err);
  });