const mongoose  = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;


const userSchema = new mongoose.Schema({
roleId : {type:objectId,ref:'Roles',required:true},
name:{type:String, required:true},
email:{type:String, required:true,unique:true},
password:{type:String, required:true},
languageSettings:{type:String, enum:['english','hindi']},
isDeleted:{type:Boolean,default:false}
},{timestamps: true});


module.exports = mongoose.model('Users',userSchema);
