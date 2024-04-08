const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("discount",discountSchema);