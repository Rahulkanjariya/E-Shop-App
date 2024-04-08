const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const { userRegisterInput, userLoginInput } = require("../middleware/joi.validation");

router.post("/User-Register",userRegisterInput,userController.userRegister);
router.post("/User-Login",userLoginInput,userController.userLogin);
router.put("/Update-Password",userController.updatePassword);
router.put("/User-Update", userController.updatedUser);
router.delete("/User-Delete",userController.deletedUser);
router.put("/Toggle-Block",userController.toggleBlockUser);
router.get("/Find-All-User",userController.findAllUser);
router.get("/Find-User",userController.findUser);

module.exports = router;