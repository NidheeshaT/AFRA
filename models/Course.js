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
           [{ type: Schema.Types.ObjectId, ref: 'Student'}],
        attendToday:[{type:Boolean,default:()=>false}],
        attendTime: [{type:Date,default:()=>0}]
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
      let course = await this.findOne({ code:code },{_id:0,__v:0}).populate({path:'enrolled',select:{'label':1}});
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
    course.attendToday.push(false)
    course.attendTime.push(0)
      course.save()
      return 1
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
};

courseSchema.statics.addAttendance = async function(code,matches){
    try{
        let course = await this.findOne({ code:code }).populate('enrolled');
        matches.forEach(match => {
            for(let i=0;i<course.enrolled.length;i++)
            {
                if(match.label===course.enrolled[i].label)
                {
                    course.attendToday[i]=true;
                    course.attendTime[i]=Date.now()
                }
            }
        });
        course.save()
    }
    catch (e) {
        console.log(e.message);
    }
}


courseSchema.statics.returnAttendance = async function(code){
    try{
        let course = await this.findOne({ code:code }).populate('enrolled');
        let objs=[];

        for(let i=0;i<course.enrolled.length;i++)
        {
            let obj={}
            obj.label=course.enrolled[i].label
            obj.attendToday=course.attendToday[i];
            obj.attendTime=course.attendTime[i].toISOString()
            objs.push(obj)
        }
        return objs;
    }
    catch (e) {
        console.log(e.message);
        return 0
    }
}

const courseModel=model("Courses",courseSchema)
module.exports=courseModel