const Product = require("../models/product");
const User = require("../models/user");

exports.addProduct = async (req,res) => {
    try {
        let { productCode, productName, price, quantity, category } = req.body

        const existingProduct = await Product.findOne({
            $or: [
                { productName },
                { price }
            ]
        });

        if(existingProduct){
            return res.status(400).json({
                success:false,
                message:"Product already exists!"
            });
        } else{
            if(quantity > 5){
                return res.status(400).json({
                    success:false,
                    message:"Quantity cannot exceed 5"
                });
            }

            const newProduct = new Product({
                productCode,
                productName,
                price,
                quantity,
                category,
                productImage: req.file.filename
            });

            const savedProduct = await newProduct.save();

            res.status(201).json({
                success:true,
                message:"Product added successfully",
                data:savedProduct
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.updateProduct = async (req,res) => {
    try {
        let productId = req.body.productId;
        let updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success:false,
                message:"Product not found!"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Product updated successfully",
                data:updatedProduct
            });
        } 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.deleteProduct = async (req,res) => {
    try {
        let productId = req.body.productId;
        let productDelete = await Product.findOneAndDelete(productId);

        if(!productDelete){
            return res.status(404).json({
                success:false,
                message:"Product not found!"
            });
        }

        if(productDelete.isDeleted = true) {
            res.status(200).json({
                success:true,
                message:"Product deleted successfully",
                productDelete
            });
        } else {
            res.status(400).json({
                success:false,
                message:"Product not active"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.deleteProductImage = async (req, res) => {
    try {
        const { productId, imageId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found!"
            });
        }

        const imageIndex = product.productImage.findIndex(
            image => image.file === imageId
        );

        if (imageIndex === -1) {
            return res.status(404).json({
                success:false,
                message:"Image not found in product"
            });
        }

        product.productImage.splice(imageIndex, 1);
        await product.save();

        res.status(200).json({
            success: true,
            message:"Image deleted successfully",
            remainingImages:product.productImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.findAllProducts = async (req,res) => {
    try {
        let productData = await Product.find()
        if(!productData){
            return res.status(404).json({
                succuss:false,
                message:"Product not found!"
            });
        } else{
            res.status(200).json({
                success:true,
                message:"All product find successfully",
                data:productData
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.findProduct = async (req,res) => {
    try {
        let productId = req.body.productId;
        let productData = await Product.findById(productId);

        if (!productData) {
            return res.status(404).json({
                success:false,
                message:"Product not found!"
            });
        } else {
            res.status(200).json({
                success:true,
                message:"Product find successfully",
                data:productData
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        let { productName, category } = req.query;
        let query = {};
        
        if(productName){
            query.productName = { $regex: productName, $options: "i" };
        }

        if(category){
            query.category = category;
        }
        const products = await Product.find(query);

        if(!products){
            return res.status(404).json({
                success:false,
                message:"No products found matching the search criteria",
            })
        } else {
            res.status(200).json({
                success:true,
                message:"Products found successfully",
                data:products
            });    
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};


exports.likeProduct = async (req,res) => {
    try {
        let { userId, productId } = req.body
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if(user.likes.includes(productId)) {
            return res.status(400).json({
                success:false,
                message:"You have already liked this product"
            })
        }
        user.likes.push(productId);
        user.isLiked = true;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Product liked successfully",
            data:user
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
};

exports.dislikeProduct = async (req,res) => {
    try {
        let { userId, productId } = req.body
        let user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        if(user.dislikes.includes(productId)) {
            return res.status(400).json({
                success:false,
                message:"You have already disliked this post"
            })
        }
        user.dislikes.push(productId);
        user.isDisliked = true;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Product disliked successfully",
            data:user
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
}


exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({
                success:false,
                message:"Product already in the wishlist"
            });
        }

        user.wishlist.push(productId);
        await user.save();

        res.status(200).json({
            success:true,
            message:"Product added to wishlist successfully",
            data:user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.getUserWishllist = async (req,res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if (!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"User wishlist retrieved successfully",
            data:user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.markAsSold = async (req,res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        product.sold = true;
        await product.save();

        res.status(200).json({
            success:true,
            message:"Product marked as sold successfully",
            data:product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.addRating = async (req, res) => {
    try {
        const { productId, star, comment, userId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }

        product.ratings.push({ star, comment, postedby: userId });
        await product.save();

        const totalRating = calculateTotalRating(product.ratings);

        product.totalrating = totalRating;
        await product.save();

        res.status(200).json({
            success:true,
            message:"Rating added successfully",
            data:product.totalrating
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};

exports.getTotalRating = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Total rating retrieved successfully",
            data:product.totalrating
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error",
        });
    }
};


function calculateTotalRating(ratings) {
    if (ratings.length === 0) {
        return 0;
    }

    const totalStars = ratings.reduce((acc, curr) => acc + curr.star, 0);
    return totalStars / ratings.length;
}