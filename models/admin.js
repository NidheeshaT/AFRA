const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const salt=bcrypt.genSaltSync(12)

const adminSchema = new mongoose.Schema({
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
    }
});


adminSchema.statics.addAdmin = async function(admin) {
    try {
        admin.password=bcrypt.hashSync(admin.password,salt)
        await this.create(admin);
    } 
    catch (e) {
      console.log(e);
      return 0;
    }
  
    return 1;
};

studentSchema.statics.getAdmin = async function(id,password) {
    try {
        let admin=this.findOne({id:id},{_id:0})
        if(bcrypt.compareSync(password,admin.password))
        {
            delete admin.password
            return admin
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