const express = require("express");
const app = express();
require("./src/config/db.config");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const userRouter = require("./src/routes/userRouter");
app.use("/",userRouter);

const adminRouter = require("./src/routes/adminRouter");
app.use("/",adminRouter);

const productRouter = require("./src/routes/productRouter");
app.use("/",productRouter);

const sellerRouter = require("./src/routes/sellerRouter");
app.use("/",sellerRouter);

const cartRouter = require("./src/routes/cartRouter");
app.use("/",cartRouter);

const offerRouter = require("./src/routes/offerRouter");
app.use("/",offerRouter);

const couponRouter = require("./src/routes/couponRouter");
app.use("/",couponRouter);

const discountRouter = require("./src/routes/discountRouter");
app.use("/",discountRouter);

const orderRouter = require("./src/routes/orderRouter");
app.use("/",orderRouter);

const enquiryRouter = require("./src/routes/enquiryRouter");
app.use("/",enquiryRouter);

const feedbackRouter = require("./src/routes/feedbackRouter");
app.use("/",feedbackRouter);

app.listen(PORT,() => {
    console.log(`Server running port no ${PORT}`)
});
