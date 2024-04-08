const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    adminName: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

module.exports = mongoose.model("admin",adminSchema)