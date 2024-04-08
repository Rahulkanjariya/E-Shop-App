const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { adminRegisterInput, adminLoginInput } = require("../middleware/joi.validation");
const{ adminVerifyToken } = require("../middleware/auth");

router.post("/Admin-Register",adminRegisterInput,adminController.adminRegister);
router.post("/Admin-Login",adminLoginInput,adminController.adminLogin);
router.put("/Update-Password",adminVerifyToken,adminController.updatePassword);
router.post("/Admin-Reactive",adminVerifyToken,adminController.adminReactive);
router.put("/Admin-Update",adminVerifyToken,adminController.adminUpdate);
router.delete("/Admin-Delete",adminVerifyToken,adminController.adminDelete);
router.get("/Find-All-Admin",adminController.findAllAdmin);
router.get("/Find-Admin",adminVerifyToken,adminController.findAdmin);

module.exports = router;