const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCode:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:"Admin",
    },
    sold:{
        type:Number,
        default:0
    },
    productImage:{
        type:String,
        required:true
    },
    ratings:[{
        star:Number,
        comment:String,
        postedby:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    }],
    totalrating:{
        type:String,
        default: 0,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
},{ timestamps: true });

module.exports = mongoose.model("product",productSchema)