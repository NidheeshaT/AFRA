const mongoose=require("mongoose")
const enrollerSchema = new mongoose.Schema({
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name:{
        type: String,
        required: true,
      },
      password:{
        type:String,
        required:true
      },
      department:{
        type:String
      }
});

const enrollerModel=mongoose.model("Enroller",enrollerSchema)
module.exports=enrollerModel