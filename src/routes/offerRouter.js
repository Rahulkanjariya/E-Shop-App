const router = require("express").Router();
const offerController = require("../controllers/offerController");

router.post("/Create-Offer",offerController.createOffer);
router.post("/Apply-Offer",offerController.applyOffer);
router.post("/Buy3-Pay2", offerController.buy3pay2Offer);


module.exports = router;