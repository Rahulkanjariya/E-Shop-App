const router = require("express").Router();
const discountController = require("../controllers/discountController");

router.post("/Create-Discount",discountController.createDiscount);
router.post("/Apply-Discount",discountController.applyDiscount);

module.exports = router
