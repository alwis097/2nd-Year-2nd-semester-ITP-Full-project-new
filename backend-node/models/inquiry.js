const mongoose = require("mongoose");

// Page Inquiry
const InquirySchema = mongoose.Schema({
    customerName: {
        type: String,
    },
    customerID: {
        type: String,
    },
    inquiryContent: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
});

const Inquiry = (module.exports = mongoose.model("Inquiry", InquirySchema));