const mongoose = require("mongoose");

// Page Branch
const BranchSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
});

const Branch = (module.exports = mongoose.model("Branch", BranchSchema));