const mongoose = require("mongoose");

// Page Supplier
const SupplierSchema = mongoose.Schema({
    name: {
        type: String,
    },
    company_name: {
        type: String,
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
});

const Supplier = (module.exports = mongoose.model("Supplier", SupplierSchema));