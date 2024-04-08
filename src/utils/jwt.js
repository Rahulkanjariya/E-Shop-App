const jwt = require("jsonwebtoken");
const { USER_SECRECT_KEY,ADMIN_SECRECT_KEY,SELLER_SECRECT_KEY } = process.env

async function userJwtToken(userId) {
    try {
        const payload = { id: userId };
        const token = jwt.sign(payload, USER_SECRECT_KEY);
        return token;
    } catch (error) {
        return { error: true }
    }
}

async function adminJwtToken(adminId){
    try {
        const payload = { id: adminId };
        const token = jwt.sign(payload, ADMIN_SECRECT_KEY);
        return token;
    } catch(error){
        return { error: true }
    }
}

async function sellerJwtToken(sellerId){
    try {
        const payload = { id: sellerId };
        const token = jwt.sign(payload, SELLER_SECRECT_KEY);
        return token;
    } catch(error){
        return { error: true }
    }
}

module.exports = { userJwtToken, adminJwtToken, sellerJwtToken}