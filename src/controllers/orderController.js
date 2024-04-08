const Order = require("../models/order");

exports.createOrder = async (req,res) => {
    try {
        const { cartId, shippingAddress1, shippingAddress2, city, zip, country, phone, totalPrice } = req.body;
        if(!cartId){
            return res.status(400).json({
                success:false,
                message:"Cart not found!"
            });
        }
        let newOrder = new Order({
            cartId,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            totalPrice,
        });
        let savedOrder = await newOrder.save();
        res.status(200).json({
            success:true,
            message:"Order created successfully",
            data:savedOrder
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};


exports.completeOrder = async (req,res) => {
    try {
        const orderId = req.body.orderId;
        const orderData = await Order.findById(orderId);

        if (!orderData) {
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }
        orderData.status = "completed";
        const completedOrder = await orderData.save();
        
        res.status(200).json({
            success:true,
            message:"Order marked as completed",
            data:completedOrder
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.pendingOrder = async (req,res) => {
    try {
        const orderId = req.body.orderId;
        const orderData = await Order.findById(orderId);

        if (!orderData) {
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }
        orderData.status = "pending";
        const pendingOrder = await orderData.save();
        
        res.status(200).json({
            success:true,
            message:"Order marked as pending",
            data:pendingOrder
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const orderData = await Order.findById(orderId);

        if (!orderData) {
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }

        if (orderData.status === 'canceled' || orderData.status === 'completed') {
            return res.status(400).json({
                success:false,
                message:"Cannot cancel the order. It is already canceled or completed."
            });
        }

        orderData.status = "canceled";
        const canceledOrder = await orderData.save();

        res.status(200).json({
            success:true,
            message:"Order canceled successfully",
            data:canceledOrder
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.updateOrder = async (req,res) => {
    try {
        const orderId = req.body.orderId;
        const orderData = await Order.findById(orderId);
        const { action } = req.body;

        if(!orderData){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            });
        }

        if (!["complete","pending","cancel"].includes(action)) {
            return res.status(400).json({
                success:false,
                message:"Invalid action. Supported actions are: complete, pending, cancel"
            });
        }

        switch(action){
            case "complete":
                orderData.status = "completed";
                break;
            case "pending":
                orderData.status = "pending";
                break;
            case "cancel":
                orderData.status = "canceled";
                break;
        }

        const updateOrder = await orderData.save();

        res.status(200).json({
            success:true,
            message:`Order ${action} successfully`,
            data:updateOrder
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find().populate("cartId");
        if(!orders){
            return res.status(404).json({
                sucess:false,
                message:"No orders found for the specified cart"
            });
        }
        res.status(200).json({
            sucess:true,
            message:"Orders retrieved successfully",
            data:orders
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

