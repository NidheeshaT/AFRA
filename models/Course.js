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

courseSchema.statics.ReturnFaces = async function(usn, descriptions) {
    try {
      let students = await this.findOne({ code:code }).populate('enrolled',{label:1,descriptions:1,_id:0,__v:0});
      return students;
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

const courseModel=model("Courses",courseSchema)
module.exports=courseModel