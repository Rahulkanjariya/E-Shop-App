const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://127.0.0.1:27017/E-Shop")

.then(() => {
    console.log("Database Connected Successfully")
}).catch((err) => {
    throw(err)
})