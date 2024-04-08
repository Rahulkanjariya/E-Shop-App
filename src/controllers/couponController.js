const Coupon = require("../models/coupon");

exports.createCoupon = async (req,res) => {
    try {
        const { name, expiry, discount } = req.body;
        const coupon = new Coupon({
            name,
            expiry,
            discount
        });
        let result = await coupon.save();
        res.status(200).json({
            success:true,
            message:"Coupon created successfully",
            data:result
        });
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
};

exports.updateCoupon = async (req,res) => {
    try {
        let couponId = req.body.couponId;
        let updateData = req.body;

        let updatedCoupon = await Coupon.findByIdAndUpdate(
            couponId,
            updateData,
            { new: true }
        );

        if(!updatedCoupon){
            res.status(404).json({
                success:false,
                message:"Coupon not found"
            })
        } else {
            res.status(200).json({
                success:true,
                message:"Coupon updated successfully",
                data:updatedCoupon
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
};

exports.deleteCoupon = async (req,res) => {
    try {
        const couponId = req.body.couponId;
        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

        if (!deletedCoupon) {
            return res.status(404).json({
                success:false,
                message:"Coupon not found"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Coupon deleted successfully",
                data:deletedCoupon
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
};

exports.findallCoupon = async (req,res) => {
    try {
        let coupons = await Coupon.find();
        if(!coupons){
            res.status(404).json({
                success:false,
                message:"No coupons found"
            })
        } else {
            res.status(200).json({
                success:true,
                message:"All coupons retrieved successfully",
                data:coupons
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
};

exports.findCoupon = async (req,res) => {
    try {
        let couponId = req.body.couponId;
        let coupon = await Coupon.findById(couponId);

        if(!coupon){
            res.status(404).json({
                success:false,
                message:"Coupon not found"
            })
        } else {
            res.status(200).json({
                success:true,
                message:"Coupon retrieved successfully",
                data:coupon
            });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
};

