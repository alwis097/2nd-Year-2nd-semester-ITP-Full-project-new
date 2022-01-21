const mongoose = require("mongoose");

// Page Feedback
const FeedbackSchema = mongoose.Schema({
    topic: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Feedback = (module.exports = mongoose.model("Feedback", FeedbackSchema));