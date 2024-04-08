const jwt = require("jsonwebtoken");
const { USER_SECRECT_KEY, ADMIN_SECRECT_KEY, SELLER_SECRECT_KEY } = process.env


const userVerifyToken = (req, res, next) => {
    const userToken = req.body.token || req.query.token || req.headers["token"];

    if (!userToken) {
        return res.status(400).json({ 
            succuss:false,
            message:"Token not authorized" 
        })
    };
    try {
        const decode = jwt.verify(userToken, USER_SECRECT_KEY);
        req.user = decode._id
    } catch (error) {
        return res.status(400).json({
            succuss:false,
            message:"Invalid token"
        })
    };
    return next()
};

const adminVerifyToken = (req, res, next) => {
    const adminToken = req.body.token || req.query.token || req.headers["token"];

    if (!adminToken) {
        return res.status(400).json({
            succuss:false,
            message:"Token not authorized" })
    };
    try {
        const decode = jwt.verify(adminToken, ADMIN_SECRECT_KEY);
        req.user = decode._id
    } catch (error) {
        return res.status(400).json({
            succuss:false,
            message:"Invalid token" })
    };
    return next()
};

const sellerVerifyToken = (req, res, next) => {
    const sellerToken = req.body.token || req.query.token || req.headers["token"];

    if (!sellerToken) {
        return res.status(400).json({
            succuss:false,
            message:"Token not authorized" 
        })
    };
    try {
        const decode = jwt.verify(sellerToken, SELLER_SECRECT_KEY);
        req.user = decode._id;
    } catch (error) {
        return res.status(400).json({
            succuss:false,
            message:"Invalid token" })
    };
    return next()
};

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["token"];

    if (!token) {
        return res.status(400).json({
            success:false,
            message:"Token not provided" 
        });
    }

    try {
        let decode = jwt.verify(token, ADMIN_SECRECT_KEY);
        req.user = decode._id;
    } catch (adminError) {
        try {
            decode = jwt.verify(token, SELLER_SECRECT_KEY);
            req.user = decode._id;
        }
        catch (sellerError) {
            return res.status(400).json({
                success:false,
                message:"Token invalid" 
            });
        }
    }

    return next();
};


module.exports = { userVerifyToken, adminVerifyToken, sellerVerifyToken, verifyToken }