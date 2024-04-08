const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { userVerifyToken } = require("../middleware/auth");

router.post("/Add-To-Cart",userVerifyToken,cartController.addToCart);
router.put("/Update-CartItem",userVerifyToken,cartController.updateCartItem);
router.delete("/Delete-CartItem",userVerifyToken,cartController.deleteCartItem);
router.get("/Find-All-Items",cartController.getAllItems);

module.exports = router;