const router = require("express").Router();
const productController = require("../controllers/productController");
const { adminVerifyToken, verifyToken } = require("../middleware/auth")
const upload = require("../middleware/upload");

router.post("/Add-Product",verifyToken,upload,productController.addProduct);
router.put("/Update-Product",adminVerifyToken,productController.updateProduct);
router.delete("/Delete-Product",adminVerifyToken,productController.deleteProduct);
router.delete("/deleteImage/:id/:imageId",productController.deleteProductImage);
router.get("/Find-All-Products",verifyToken,productController.findAllProducts);
router.get("/Find-Product",verifyToken,productController.findProduct);

router.get("/Search-Products",productController.searchProducts);

router.post("/Like-Product",productController.likeProduct);
router.post("/Dislike-Product",productController.dislikeProduct);

router.put("/Add-To-Wishlist",productController.addToWishlist);
router.get("/Get-Wishlist",productController.getUserWishllist);
router.put("/Mark-As-Sold",productController.markAsSold);

router.put("/Add-Rating",productController.addRating);
router.get("/Total-Rating",productController.getTotalRating);


module.exports = router