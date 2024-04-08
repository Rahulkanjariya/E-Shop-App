const router = require("express").Router();
const enquiryController = require("../controllers/enquiryController");

router.post("/Create-Enquiry",enquiryController.createEnquiry);
router.put("/Update-Enquiry",enquiryController.updateEnquiry);
router.delete("/Delete-Enquiry",enquiryController.deleteEnquiry);
router.get("/Find-All-Enquiry",enquiryController.findAllEnquiry);
router.get("/Find-Enquiry",enquiryController.findEnquiry);


module.exports = router;