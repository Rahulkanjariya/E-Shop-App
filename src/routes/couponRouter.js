const router = require("express").Router();
const couponController = require("../controllers/couponController");

router.post("/Add-Coupon",couponController.createCoupon);
router.put("/Update-Coupon",couponController.updateCoupon);
router.delete("/Delete-Coupon",couponController.deleteCoupon);
router.get("/Find-All-Coupon",couponController.findallCoupon);
router.get("/Find-Coupon",couponController.findCoupon);

module.exports = router;


