const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
role:{type:String,enum:['superAdmin','admin','transporter','sse','ose'],required:true,trim:true} 
},{timestamps:true});


module.exports = mongoose.model("Roles",rolesSchema);

