const router = require("express").Router();
const sellerController = require("../controllers/sellerController");
const { sellerRegisterInput, sellerLoginInput } = require("../middleware/joi.validation");
const { sellerVerifyToken } = require("../middleware/auth");

router.post("/Seller-Register",sellerRegisterInput,sellerController.sellerRegister);
router.post("/Seller-Login",sellerLoginInput,sellerController.sellerLogin);
router.post("/Seller-Reactive",sellerVerifyToken,sellerController.sellerReactiveUser);
router.post("/Verify-OTP",sellerVerifyToken,sellerController.verifyOTP);
router.post("/Resend-OTP",sellerVerifyToken,sellerController.resendOTP);
router.get("/Find-All-Seller",sellerController.findAllSeller);
router.get("/Find-Seller",sellerVerifyToken,sellerController.findSeller);

module.exports = router