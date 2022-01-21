const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedback");

// GET /feedbacks
router.get("/", (req, res) => {
    Feedback.find({}, (error, feedbacks) => {
        if (error) console.log(error);
        res.json(feedbacks);
    });
});

// POST /feedbacks
router.post("/", (req, res) => {
    const topic = req.fields.topic;
    const description = req.fields.description;

    const feedback = new Feedback({
        topic: topic,
        description: description,
    });

    feedback.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /deliveries/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const topic = req.fields.topic;
    const description = req.fields.description;

    Feedback.findById(id, (error, feedback) => {
        if (error) console.log(error);

        feedback.topic = topic;
        feedback.description = description;

        feedback.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Feedback.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
