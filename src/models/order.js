const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    shippingAddress1:{
        type:String,
    },
    shippingAddress2:{
        type:String
    },
    city:{
        type:String
    },
    zip:{
        type:String
    },
    country:{
        type:String
    },
    phone:{
        type:String
    },
    status:{
        type:String,
        enum:[
            "pending",
            "completed",
            "canceled",
            "shipped",
            "delivered"
        ],
        default:"pending"
    },
    totalPrice:{
        type:Number
    },
    dateOrdered: {
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("order",orderSchema);