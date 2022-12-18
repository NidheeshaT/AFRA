const {Schema,model, default: mongoose}=require("mongoose")
const newFaceSchema = new Schema({
      label:String,
      descriptions:Array  
});

newFaceSchema.statics.addFace= async function(match,descriptions)
{
    try{
        if(match._label!=='unknown')
        {
            await this.updateOne({label:match._label},{label:match._label,descriptions:descriptions},{upsert:true})
        }
    }
    catch(e){
        console.log(e)
    }
}

const newFaceModel = mongoose.model("newFace", newFaceSchema);
module.exports=newFaceModel