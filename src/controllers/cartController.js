const CartItem = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, count, color, price } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        let cartItem = await CartItem.findOne({ orderedBy: userId });
        if (!cartItem) {
            cartItem = new CartItem({
                orderedBy:userId,
                items:[]
            });
        }
        const existingItemIndex = cartItem.items.findIndex(
            item => item.productId.toString() === productId
        );
        if (existingItemIndex !== -1) {
            cartItem.items[existingItemIndex].quantity += quantity;
        } else {
            cartItem.items.push({ productId, quantity, count, color, price });
        }

        cartItem.cartTotal = cartItem.items.reduce((total, item) => total + (item.quantity * item.price), 0);
        // cartItem.totalAfterDiscount = cartItem.cartTotal;

        await cartItem.save();

        res.status(201).json({
            success:true,
            message:"Product added to cart successfully",
            cartItem
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { cartId, quantity } = req.body
        let cartItem = await CartItem.findById(cartId);

        if (!cartItem) {
            return res.status(404).json({
                success:false,
                message:"Cart item not found"
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({
            success: true,
            message:"Cart item updated successfully",
            cartItem
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        let cartId = req.body.cartId;
        const deletedCart = await CartItem.findByIdAndDelete(cartId);

        if (!deletedCart) {
            return res.status(404).json({
                success:false,
                message:"Cart item not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Cart item deleted successfully",
            data:deletedCart
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};


exports.getAllItems = async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate({ path: "items.productId" });
        if (!cartItems) {
            return res.status(404).json({
                success:false,
                message:"Cart not found or cart is empty"
            });
        }
        res.status(200).json({
            success:true,
            message:"Cart items fetched successfully",
            cartItems
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};
