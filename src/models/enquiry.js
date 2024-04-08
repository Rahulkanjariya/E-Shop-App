let mongoose = require("mongoose");

let enquirySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    comment:{
        type:String,
    },
    status:{
        type:String,
        default:"Pending",
        enum:[
            "Pending",
            "Submitted",
            "Contacted",
            "In Progress",
            "Resolved"
        ],
    },
},{timestamps:true});

module.exports = mongoose.model("enquiry",enquirySchema);