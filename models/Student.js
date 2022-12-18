const mongoose = require("mongoose");
const { randomUUID } = require("crypto")
const studentSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  descriptions: {
    type: Array,
    required: true,
  },
  image:{
    type:String
  }
});


studentSchema.statics.addStudent = async function(student,image) {
  try {
    let studentNew=await this.create(student)
    studentNew.__v=undefined
    studentNew.descriptions=undefined
    const stored=randomUUID().substring(0,10)+image.name
    const uploadPath='./upload/'+stored
    if(image.mimetype==='image/jpeg'||image.mimetype==='image/jpg'||image.mimetype==='image/png')
    {
        image.mv(uploadPath)
    }

    studentNew.image=stored
    return studentNew
  } 
  catch (e) {
    console.log(e.message);
    return 0;
  }

};

studentSchema.statics.addFace = async function(usn, descriptions) {
  try {
    let student = await this.findOne({ label: usn });
    student.descriptions = student.descriptions.concat(descriptions);
    student.save();
  } 
  catch (e) {
    console.log(e);
    return 0;
  }

  return 1;
};
studentSchema.statics.getStudent = async function(usn) {
  try {
    let student = await this.findOne({ label: usn },{_id:0,__v:0,descriptions:0});
    if(student)
        return student;

    return 0
  } 
  catch (e) {
    console.log(e);
    return 0;
  }
};


const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;
