const mongoose = require("mongoose");

// Page Delivery
const DeliverySchema = mongoose.Schema({
    order: {
        type: String,
    },
    deliveryman: {
        type: String,
    },
    vehicleno: {
        type: String,
    },
    nic: {
        type: String,
    },
    contact: {
        type: String,
    },
    status: {
        type: String,
    },
});

const Delivery = (module.exports = mongoose.model("Delivery", DeliverySchema));