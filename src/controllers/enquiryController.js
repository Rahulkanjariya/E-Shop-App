const Enquiry = require("../models/enquiry");

exports.createEnquiry = async (req,res) => {
    try {
        let { name, email, mobile, comment } = req.body;
        const enquiry = new Enquiry({
            name,
            email,
            mobile,
            comment
        });
        
        let result = await enquiry.save();
        res.status(200).json({
            success:true,
            message:"Enquiry created successfully",
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

exports.updateEnquiry = async (req,res) => {
    try {
        let enquiryId = req.body.enquiryId;
        let updateData = req.body;

        let updatedEnquiry = await Enquiry.findByIdAndUpdate(
            enquiryId,
            updateData,
            { new: true } 
        );
        if(!updatedEnquiry){
            return res.status(404).json({
                success:false,
                message:"Enquiry not found"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Enquiry updated successfully",
                data:updatedEnquiry
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

exports.deleteEnquiry = async (req,res) => {
    try {
        const enquiryId = req.body.enquiryId;
        const deletedEnquiry = await Enquiry.findByIdAndDelete(enquiryId);

        if (!deletedEnquiry) {
            return res.status(404).json({
                success:false,
                message:"Enquiry not found"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Enquiry deleted successfully",
                data:deletedEnquiry
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

exports.findAllEnquiry = async (req,res) => {
    try {
        let enquiry = await Enquiry.find();

        if(!enquiry){
            return res.status(404).json({
                success:false,
                message:"No enquiry found"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"All enquiry retrived successfully",
                data:enquiry
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

exports.findEnquiry = async (req,res) => {
    try {
        let enquiryId = req.body.enquiryId;
        let enquiry = await Enquiry.findById(enquiryId);

        if(!enquiry){
            return res.status(404).json({
                success:false,
                message:"Enquiry not found"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Enquiry retrieved successfully",
                data:enquiry
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

