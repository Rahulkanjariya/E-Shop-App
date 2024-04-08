const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/Create-Order",orderController.createOrder);
router.put("/Complete-Order",orderController.completeOrder);
router.put("/Pending-Order",orderController.pendingOrder);
router.put("/Cancel-Order", orderController.cancelOrder);
router.put("/Update-Order",orderController.updateOrder);
router.get("/Get-All-Orders",orderController.getAllOrders);

module.exports = router;