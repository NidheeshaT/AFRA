const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const {faceapi,storeImages,LoadModels}=require('./faceAPI/api')
const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

async function run()
{
  await LoadModels()
  await storeImages([__dirname+'/images/thor1.jpeg'],"thor")
}
run()




// add your mongo key instead of the ***
mongoose
  .connect(
    'mongodb://localhost:27017/dum',
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("DB connected and server us running.");
  })
  .catch((err) => {
    console.log(err);
  });