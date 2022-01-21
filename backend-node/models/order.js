const mongoose = require("mongoose");

// Order Schema
const OrderSchema = mongoose.Schema({
    date: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    cart: {
        type: String,
    },
    total: {
        type: Number,
    },
    feedback: {
        type: String,
    },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema));