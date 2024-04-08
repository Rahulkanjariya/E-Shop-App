const Discount = require("../models/discount");
const generateRandomCode = require("../utils/common");

exports.createDiscount = async (req,res) => {
    try {
        let { percentage } = req.body;
        let code = generateRandomCode();
        
        let discountData = new Discount({
            code,
            percentage,
        });
        
        let result = await discountData.save();
        
        res.status(200).json({
            success:true,
            message:"Discount added successfully",
            data:result
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.applyDiscount = async (req,res) => {
    try {
        const { code, totalAmount } = req.body;
        const discount = await Discount.findOne({ code });

        if(!discount){
            return res.status(400).json({
                success:false,
                message:"Discount not found"
            });
        }

        let discountedAmount = totalAmount;

        if(totalAmount > 799){
            discountedAmount = totalAmount - (totalAmount * (discount.percentage)/100);
            res.status(200).json({
                success:true,
                message:"Discount applied successfully",
                data:{
                    originalAmount:totalAmount,
                    discountedAmount
                }
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Discount not applied",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};