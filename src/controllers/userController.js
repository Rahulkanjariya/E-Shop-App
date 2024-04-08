const bcrypt = require("bcrypt");
const User = require("../models/user");
const{ userJwtToken } = require("../utils/jwt");

exports.userRegister = async (req,res) => {
    try {
        const { email, password, mobile } = req.body;
        let userData = await User.findOne({ email });
        
        if(userData){
            return res.status(400).json({
                succuss:false,
                message:`User with email ${email} already exists!`
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
                message: 'Mobile number must be exactly 10 digits'
            });
        }

        const hash = await bcrypt.hash(password,10);

        userData = await User.findOne({ mobile });
        if (userData) {
            return res.status(400).json({
                succuss:false,
                message: `User with the provided mobile number ${mobile} already exists`
            });
        }
        const data = new User({
            userName:req.body.userName,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hash,
            mobile:req.body.mobile,
            gender:req.body.gender,
            address:req.body.address,
            city:req.body.city,
            country:req.body.country
        });
        const result = await data.save();

        res.status(200).json({
            success:true,
            message:"User registered successfully",
            user:result
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.userLogin = async(req,res) => {
    try {
        const { email, password } = req.body;
        let userData = await User.findOne({ email });

        if(!userData){
            res.status(400).json({
                succuss:false,
                message:"Email is incorrect"
            });
        } else{
            const passwordMatch = await bcrypt.compare(password,userData.password);
            let token = await userJwtToken(userData.id)

            if(!passwordMatch){
                res.status(400).json({
                    succuss:false,
                    message:"Invalid password"
                });
            } else{
                res.status(200).json({
                    success:true,
                    message:"User login successfully",
                    userData,
                    token
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.updatePassword = async (req,res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                success:false,
                message:"Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Password updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};


exports.updatedUser = async (req,res) => {
    try {
        let userId = req.body.userId;
        let updateData = await User.findById(userId);

        if(!updateData){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            });
        } else {
            let updateUser = await User.findByIdAndUpdate(
                userId,
                req.body,
                { new: true }
            );
            
            return res.status(200).json({
                success:true,
                message:"User updated successfully",
                data:updateUser
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

exports.deletedUser = async (req,res) => {
    try {
        const userId = req.body.userId;
        const deleteUser = await User.findByIdAndDelete(userId);
        
        if(!deleteUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        } else {
            res.status(200).json({
                success:true,
                message:"User deleted successfully",
                data:deleteUser
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.toggleBlockUser = async (req,res) => {
    try {
        const userId = req.body.userId;
        const { action } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        
        if (action === "block") {
            user.isBlocked = true;
            await user.save();
            res.status(200).json({
                success:true,
                message:"User blocked successfully",
                data:user
            });
        } else if (action === "unblock") {
            user.isBlocked = false;
            await user.save();
            res.status(200).json({
                success: true,
                message:"User unblocked successfully",
                data:user
            });
        } else {
            return res.status(400).json({
                success:false,
                message:"Invalid action"
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

exports.findAllUser = async(req,res) => {
    try {
        const getUser = await User.find();
        if (!getUser) {
            return res.status(404).json({
                success:false,
                message:"User not found!"
            });
        } else{
            res.status(200).json({
                success:true,
                message:"User find succussfully",
                data:getUser
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

exports.findUser = async (req,res) => {
    try {
        let userId = req.body.userId;
        const getUser = await User.findById(userId);
        
        if (!getUser) {
            return res.status(404).json({
                success:false,
                message:"User not found!"
            });
        } else{
            res.status(200).json({
                success:true,
                message:"User find succussfully",
                data:getUser
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

