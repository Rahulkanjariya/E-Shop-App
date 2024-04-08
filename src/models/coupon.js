const mongoose = require("mongoose");

var couponSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    expiry:{
        type:Date,
    },
    discount:{
        type:Number,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model("coupon",couponSchema);