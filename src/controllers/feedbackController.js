const Feedback = require("../models/feedback");

exports.submitFeedback = async (req,res) => {
    try {
        let { name, email, message } = req.body;
        let feedback = new Feedback({
            name,
            email,
            message
        });
        await feedback.save();
        res.status(200).json({
            success:true,
            message:"Feedback submitted successfully",
            feedback
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const allFeedback = await Feedback.find();
        if (!allFeedback) {
            return res.status(404).json({
                success:false,
                message:"No feedback found"
            });
        }
        res.status(200).json({
            success:true,
            message:"All feedback found successfully",
            data:allFeedback
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
};
