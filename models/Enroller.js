const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const salt=bcrypt.genSaltSync(12)

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

studentSchema.statics.addEnroller = async function(enroller) {
    try {
        enroller.password=bcrypt.hashSync(enroller.password,salt)
        await this.create(enroller);
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
  
    return 1;
};

studentSchema.statics.getEnroller = async function(id,password) {
    try {
        let enroller=this.findOne({id:id},{_id:0})

        if(bcrypt.compareSync(password,enroller.password))
        {
            delete enroller.password
            return enroller
        }
        else{
            return 0
        }
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
};

const enrollerModel=mongoose.model("Enroller",enrollerSchema)
module.exports=enrollerModel