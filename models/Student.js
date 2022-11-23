const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  usn: {
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
});

const studentModel = mongoose.model("Student", studentSchema);

studentSchema.static.addFace = async function(usn, descriptions) {
  try {
    let student = await this.findOne({ usn: usn });
    student.descriptions = student.descriptions.concat(descriptions);
    student.save();
  } 
  catch (e) {
    console.log(e);
    return 0;
  }

  return 1;
};

module.exports = studentModel;
