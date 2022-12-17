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
      return students.enrolled;
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
};
courseSchema.statics.getInfo = async function(code) {
    try {
      let course = await this.findOne({ code:code },{_id:0,__v:0}).populate({path:'enrolled',select:{'label':1,'_id':0}});
      return course
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
};
courseSchema.statics.addStudents = async function(code,usn) {
    try {
      let course = await this.findOne({ code:code });
      let student=await Student.findOne({label:usn})
      course.enrolled.push(student._id)
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