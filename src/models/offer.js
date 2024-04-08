const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    eligibleProductIds:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product",
            required:true
        }
    ],
    discountAmount:{
        type:Number,
        default:1,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("offer",offerSchema);