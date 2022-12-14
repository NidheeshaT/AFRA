const Student = require("./Student")
const {Schema,model, default: mongoose}=require("mongoose")
const courseSchema = new Schema({
      code: {
        type: String,
        required: true,
        unique: true,
      },
      subSection:{
        type:String,
        default:()=>""
      },
      name:{
        type: String,
        required: true,
      },
      enrolled:
           [{ 
            type: Schema.Types.ObjectId, ref: 'Student' 
            }]
});


courseSchema.statics.returnFaces = async function(code) {
    try {
      let students = await this.findOne({ code:code }).populate({path:'enrolled',select:['label','descriptions']});
      console.log(students.enrolled)
      return students.enrolled;
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
};
courseSchema.statics.getInfo = async function(usn, descriptions) {
    try {
      let course = await this.findOne({ code:code });
      return course
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
};
courseSchema.statics.addStudents = async function(code,subSection,usn) {
    try {
      let course = await this.findOne({ code:code,subSection:subSection });
      usn.forEach(async (usn) => {
          let student=await Student.findOne({label:usn})
          course.enrolled.push(student._id)
      });
      course.save()
      return 1
    } 
    catch (e) {
      console.log(e.message);
      return 0;
    }
};

const courseModel=model("Courses",courseSchema)
module.exports=courseModel