const router = require("express").Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/Add-Feedback",feedbackController.submitFeedback);
router.get("/Find-All-Feedback",feedbackController.getAllFeedback);

module.exports = router;