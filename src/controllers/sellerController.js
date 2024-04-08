const Seller = require("../models/seller");
const emailController = require("./emailController");
const { sellerJwtToken } = require("../utils/jwt")
const bcrypt = require("bcrypt")

exports.sellerRegister = async (req, res) => {
    try {
        let { sellerEmail, password, mobile } = req.body;

        const existingSeller = await Seller.findOne({ sellerEmail });
        if(existingSeller){
            return res.status(400).json({
                success:false,
                message:"Seller with this email already exists!"
            });
        }
        
        if(password.length < 6){
            return res.status(400).json({
                succuss:false,
                message:"Password must be at least 6 characters"
            });
        }

        if (!/^\d{10}$/.test(mobile)) {
            return res.status(400).json({
                succuss:false,
                message:"Mobile number must be exactly 10 digits"
            });
        }
        
        function generateOTP() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
        const generatedOTP = generateOTP();
        
        let hash = await bcrypt.hash(password, 10)
        const newSeller = new Seller({
            sellerCode:req.body.sellerCode,
            sellerName:req.body.sellerName,
            sellerEmail:req.body.sellerEmail,
            password:hash,
            productName:req.body.productName,
            category:req.body.category,
            price:req.body.price,
            mobile:req.body.mobile,
            otp: generatedOTP
        });

        let savedSeller = await newSeller.save();
        await emailController.sendOTPEmail(newSeller.sellerEmail, generatedOTP);
        res.status(200).json({
            success:true,
            message:"Seller registered successfully",
            data:savedSeller
        });        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};

exports.sellerLogin = async (req,res) => {
    try {
        const { sellerEmail, password } = req.body;        
        let sellerUser = await Seller.findOne({ sellerEmail });

        if(!sellerUser){
            return res.status(400).json({
                success:false,
                message:"Email is incorrect!"
            });
        } else {
            const passwordMatch = await bcrypt.compare(password,sellerUser.password);
            let token = await sellerJwtToken(sellerUser.id)

            if(!passwordMatch){
                res.status(400).json({
                    success:true,
                    message:"Invalid password"
                });
            } else {
                res.status(200).json({
                    succss:true,
                    message:"Seller login successfully",
                    sellerUser,
                    token
                });
            }
        }
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};


exports.sellerReactiveUser = async (req,res) => {
    try {
        let sellerId = req.body.sellerId;
        let sellerUser = await Seller.findById(sellerId);

        if(!sellerUser){
            return res.status(404).json({
                success:false,
                message:"Seller not found!"
            });
        } else {
            if(sellerUser.isActive) {
                return res.status(400).json({
                    success:false,
                    message:"Seller is already active"
                });
            } else {
                sellerUser.isActive = true;
                await sellerUser.save();

                return res.status(200).json({
                    success:true,
                    message:"Seller reactivetd successfully",
                    status:sellerUser
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        let { sellerEmail, otp } = req.body
        let userData = await Seller.findOne({
            $or: [
                { id: req.user },
                { sellerEmail },
            ],
        });
        if (!userData) {
            return res.status(404).json({
                succuss:false,
                message:"Seller not found!"
            })
        }
        if (otp !== userData.otp) {
            res.status(400).json({
                succuss:false,
                message:"Invalid otp"
            })
        } else {
            res.status(200).json({ 
                succuss:true,
                message:"OTP Verify Successfully" 
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}

exports.resendOTP = async (req,res) => {
    try {
        let { sellerEmail } = req.body;

        if(!sellerEmail){
            return res.status(400).json({
                success:false,
                message:"Email is required"
            });
        }

        function generateOTP() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
        const otp = generateOTP();
        
        await emailController.sendOTPEmail(sellerEmail,otp);
        await Seller.findOneAndUpdate({ sellerEmail }, { otp });

        return res.status(200).json({
            success:true,
            message:"OTP resend successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}

exports.findAllSeller = async (req,res) => {
    try {
        let sellerUser = await Seller.find();
        if(!sellerUser){
            return res.status(404).json({
                success:false,
                message:"Seller user not found!"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Seller user find successfully",
                data:sellerUser
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

exports.findSeller = async (req,res) => {
    try {
        let sellerId = req.body.sellerId;
        const sellerUser = await Seller.findById(sellerId);

        if(!sellerUser){
            return res.status(404).json({
                success:false,
                message:"Seller user not found!"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Seller user find successfully",
                data:sellerUser
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};

