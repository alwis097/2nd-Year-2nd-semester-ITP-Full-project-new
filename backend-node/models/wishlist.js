const mongoose = require("mongoose");

// WishList Schema
const WishListSchema = mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
});

const WishList = (module.exports = mongoose.model("WishList", WishListSchema));
