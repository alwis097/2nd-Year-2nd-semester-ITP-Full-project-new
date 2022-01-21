const mongoose = require("mongoose");

// Page Grn
const GrnSchema = mongoose.Schema({
    product: {
        type: String,
    },
    pname: {
        type: String,
    },
    supplier: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    date: {
        type: String,
    },
});

const Grn = (module.exports = mongoose.model("Grn", GrnSchema));