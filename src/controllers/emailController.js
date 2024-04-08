const nodemailer = require('nodemailer');

exports.sendOTPEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:"Your email",
                pass:"Your password"
            }
        });

        const mailOptions = {
            from:"Your email",
            to:"test123@gmail.com",
            subject:"Your OTP for Verification",
            text:`Your OTP is : ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};