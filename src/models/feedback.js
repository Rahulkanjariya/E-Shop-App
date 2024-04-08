let mongoose = require("mongoose");

let feedbackSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("feedback",feedbackSchema);