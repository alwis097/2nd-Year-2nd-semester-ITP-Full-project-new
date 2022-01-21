const mongoose = require("mongoose");
const Product = require("../models/product");

// Page User
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

const User = (module.exports = mongoose.model("User", UserSchema));