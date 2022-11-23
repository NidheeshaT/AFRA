const {Schema,model}=require("mongoose")
const courseSchema = new Schema({
      code: {
        type: String,
        required: true,
        unique: true,
      },
      name:{
        type: String,
        required: true,
      },
      enrolled:[{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

courseSchema.static.ReturnFaces = async function(usn, descriptions) {
    try {
      let student = await this.findOne({ code:code }).populate('enrolled');
      student.descriptions = student.descriptions.concat(descriptions);
      student.save();
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
  
    return 1;
};
courseSchema.static.getInfo = async function(usn, descriptions) {
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

const courseModel=model("Courses",courseSchema)
module.exports=courseModel