const userModel = require("../../models/users");
const rolesModel = require("../../models/roles")
const bcrypt = require("bcrypt");
const userToken = require("../../models/userToken");
const jwt = require("jsonwebtoken");
const {generateAccessToken, generateRefreshToken} = require("../../utils/generateToken")

const createRole = async function(req,res){
const role = req.body;
const data = await rolesModel.create(role);
if(data)
return res.status(201).send({status:true, message:'role is created successfully'});
}


const signUp = async function(req,res){
try{
const user = req.body;
const {roleId,name,email,password,languageSettings} = user;
const userData = await userModel.findOne({email:email});
if(userData) return res.status(400).send({status:false,message:"email or contact number already exists"});
const salt = await bcrypt.genSalt(Number(process.env.SALT));
const hashedPassword = await bcrypt.hash(password, salt);
const data = await userModel.create({roleId:roleId,name:name,email:email,password:hashedPassword});
if(data)
return res.status(201).send({status:true,message:"user is created successfully"});
}catch(error){
console.log(error.message);
}
}

const signIn = async function(req,res){
try{
const user = req.body;
const {email,password} = user;
const data = await userModel.findOne({email:email});
if(!data) return res.status(400).send({status:false,message:"email or contact number is wrong"});
const verifiedPassword = await bcrypt.compare(
password,
data.password
);
if (!verifiedPassword)
return res
.status(401)
.json({ error: true, message: "Invalid email or password" });
const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);
const storeRefreshToken = await userToken.create({userId:data._id,refreshToken:refreshToken});
res.header("x-refresh-token", refreshToken);
res.header("authorization",accessToken)
res.status(200).json({
error: false,
accessToken:accessToken,
refreshToken:refreshToken,
message: "Logged in successfully",
});
}catch(error){
    console.log(error.message);
}

}

const testMe = async function(req,res){
    return res.status(200).send({status:true,message:"testMe is called"});
}

const getUserById = async function(req,res){
try{
const userId = req.body.userId;
const data = await userModel.findOne({_id:userId});
if(!data) return res.status(400).send({status:false,message:"no user exists with this userId"});
return res.status(200).send({status:true,message:data});
}catch(error){
console.log(error.message)
}
}

const updateUserById = async function(req,res){
const userId = req.body.userId;
const body = req.body;
const user = await userModel.findById({_id:userId});
if(!user) return res.status(400).send({status:false,message:"no user exists with this userId"});
Object.assign(user,body);
return res.status(200).send({status:true,message:"user is updated"});
}

const deleteUserById = async function(req,res){
const userId = req.body.userId;
const user = await userModel.findById({_id:userId});
if(!user) return res.status(400).send({status:false,message:"no user exists with this userId"});
const userIsAlreadyDeleted = user.isDeleted;
if(userIsAlreadyDeleted) return res.status(400).send({status:false,message:"user is already deleted"});
const data = await userModel.findOneAndUpdate(
    {_id:userId},
    {isDeleted:true},
    {new:true}
    )
return res.status(200).send({status:true,message:"user is deleted"});
}

module.exports = {createRole,signUp,signIn,testMe,getUserById,updateUserById,deleteUserById};