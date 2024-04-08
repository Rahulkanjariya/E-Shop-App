const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { adminJwtToken } = require("../utils/jwt");

exports.adminRegister = async (req,res) => {
    try {
        const { email, password, mobile } = req.body;

        let adminUser = await Admin.findOne({ email });
        if(adminUser){
            return res.status(400).json({
                succuss:false,
                message:`Admin with email ${email} already exists!`
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

        adminUser = await Admin.findOne({ mobile });
        if (adminUser) {
            return res.status(400).json({
                succuss:false,
                message: `Admin with the provided mobile number ${mobile} already exists`
            });
        }
        const data = new Admin({
            userName:req.body.userName,
            name:req.body.name,
            adminName:req.body.adminName,
            email:req.body.email,
            password:hash,
            mobile:req.body.mobile,
            gender:req.body.gender,
        });
        const result = await data.save();

        res.status(200).json({
            success:true,
            message:"Admin registered successfully",
            user:result
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.adminLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        let adminUser = await Admin.findOne({ email });
        
        if(!adminUser){
            res.status(400).json({
                succuss:false,
                message:"Email is incorrect"
            });
        } else{
            const passwordMatch = await bcrypt.compare(password,adminUser.password);
            let token = await adminJwtToken(adminUser.id)

            if(!passwordMatch){
                res.status(400).json({
                    succuss:false,
                    message:"Invalid password"
                });
            } else{
                res.status(200).json({
                    success:true,
                    message:"Admin login successfully",
                    adminUser,
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

exports.updatePassword = async (req, res) => {
    try {
        const { adminId, currentPassword, newPassword } = req.body;
        const adminUser = await Admin.findById(adminId);

        if (!adminUser) {
            return res.status(404).json({
                success:false,
                message:"Admin user not found!"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            adminUser.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                success:false,
                message:"Invalid current password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        adminUser.password = hashedPassword;
        await adminUser.save();

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

exports.adminReactive = async (req,res) => {
    try {
        let adminId = req.body.adminId
        let adminUser = await Admin.findById(adminId);
        
        if (!adminUser) {
            return res.status(404).json({
                message:"Admin user not found!"
            });
        } else {
            if (adminUser.isActive) {
                return res.status(400).json({
                    success:false,
                    message:"Admin user is already active"
                });
            } else {
                adminUser.isActive = true;
                await adminUser.save();
                
                return res.status(200).json({
                    success:true,
                    message:"Admin user reactivated successfully",
                    activeStatus:adminUser
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

exports.adminUpdate = async (req,res) => {
    try {
        let adminId = req.body.adminId;
        let updateData = await Admin.findById(adminId);

        if(!updateData){
            return res.status(404).json({
                success:false,
                message:"Admin user not found!"
            });
        } else {
            let updatedAdminUser = await Admin.findByIdAndUpdate(
                adminId,
                req.body,
                { new: true }
            );
            
            return res.status(200).json({
                success:true,
                message:"Admin user updated successfully",
                adminUser:updatedAdminUser
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

exports.adminDelete = async (req,res) => {
    try {
        let adminId = req.body.adminId;
        const deleteAdmin = await Admin.findOneAndDelete(adminId);

        if (!deleteAdmin) {
            return res.status(404).json({
                success:false,
                message:"Admin user not found!"
            });
        }
        
        if(deleteAdmin.isDeleted = true){     
            res.status(200).json({
                success:true,
                message:"Admin user marked as deleted successfully",
                adminUser:deleteAdmin
            });
        } else {
            return res.status(400).json({
                success:false,
                message:"Admin user is already marked as deleted"
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

exports.findAllAdmin = async(req,res) => {
    try {
        const adminUser = await Admin.find();
        if (!adminUser) {
            return res.status(404).json({
                success:false,
                message:"Admin user not found!"
            });
        } else{
            res.status(200).json({
                success:true,
                message:"Admin user find succussfully",
                data:adminUser
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

exports.findAdmin = async (req,res) => {
    try {
        let adminId = req.body.adminId;
        const adminUser = await Admin.findById(adminId);
        
        if (!adminUser) {
            return res.status(404).json({
                success:false,
                message:"Admin user not found!"
            });
        } else{
            res.status(200).json({
                success:true,
                message:"Admin user find succussfully",
                data:adminUser
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
