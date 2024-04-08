const mongoose = require("mongoose");
const sellerSchema = new mongoose.Schema({
    sellerCode:{
        type:String,
    },
    sellerName:{
        type:String,
    },
    sellerEmail:{
        type:String,
    },
    password:{
        type:String,
    },
    productName:{
        type:String,
    },
    category:{
        type:String,
    },
    price:{
        type:Number
    },
    mobile:{
        type:String
    },
    otp:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

module.exports = mongoose.model("seller",sellerSchema);