const Offer = require("../models/offer");
const Product = require("../models/product");

exports.createOffer = async (req,res) => {
    try {
        const { name, description, eligibleProductIds, discountAmount } =  req.body;

        const existingOffer = await Offer.findOne({ name });

        if(existingOffer){
            return res.status(400).json({
                success:false,
                message:"Offer with the same name already exists"
            });
        }

        const newOffer = new Offer({
            name,
            description,
            eligibleProductIds,
            discountAmount
        });

        const savedOffer = await newOffer.save();

        res.status(201).json({
            success:true,
            message:"Offer created and saved successfully",
            data:savedOffer
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.applyOffer = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success:false,
                message:"Invalid request parameters"
            });
        }
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        
        const offer = await Offer.findOne({
            // name:"Buy 1 Get 1 Free",
            eligibleProductIds: { $in: [productId] }
        });

        if (!offer) {
            return res.status(404).json({
                success:false,
                message:"Offer not available for the selected product"
            });
        }

        product.quantity += offer.discountAmount;
        await product.save();

        res.status(200).json({
            success:true,
            message:"Buy 1, Get 1 Free offer applied successfully",
            data:product
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.buy3pay2Offer = async (req, res) => {
    try {
        const { productIds } = req.body;

        const buy3pay2Offer = await Offer.findOne({
            // name:"Buy 3 Pay for 2 Sitewide",
            eligibleProductIds: { $all: productIds }
        });

        if (!buy3pay2Offer) {
            return res.status(404).json({
                success:false,
                message:"Offer not available for the selected product"
            });
        }

        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== productIds.length) {
            return res.status(404).json({
                success:false,
                message:"One or more products not found"
            });
        }
        
        const discountProduct = products[0];
        discountProduct.price = 0;
        
        await discountProduct.save();

        const totalAmount = products.reduce((total, product) => total + product.price, 0);

        res.status(200).json({
            success:true,
            message:"Buy 3 Pay for 2 Sitewide offer applied successfully",
            data: {
                products,
                totalAmount
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};
