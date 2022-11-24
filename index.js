const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const {faceapi,storeImages,LoadModels}=require('./faceAPI/api')
const app = express();
const authRouter=require("./routes/auth")

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json())

app.use(authRouter)




// add your mongo key instead of the ***
mongoose
.connect('mongodb://localhost:27017/AFRA',).then(() => {
    app.listen(process.env.PORT || 80);
    console.log("DB connected and server us running.");
  })
  .catch((err) => {
    console.log(err);
  });