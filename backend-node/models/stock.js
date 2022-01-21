const mongoose = require("mongoose");

// Page Stock
const StockSchema = mongoose.Schema({
    product: {
        type: String,
    },
    quantity: {
        type: Number,
    },
});

const Stock = (module.exports = mongoose.model("Stock", StockSchema));