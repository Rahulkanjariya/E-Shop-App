const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    items:
    [
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            count:Number,
            color:String,
            price:Number,
            quantity:Number
        }
    ],
    cartTotal:Number,
    totalAfterDiscount:Number,
    active: {
        type:Boolean,
        default:true
    },
    orderby: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
},{ timestamps:true });

module.exports = mongoose.model("cart", cartItemSchema)