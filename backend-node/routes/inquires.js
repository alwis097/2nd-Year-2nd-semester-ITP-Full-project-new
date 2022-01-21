const express = require("express");
const router = express.Router();

const Inquiry = require("../models/inquiry");

// GET /inquires
router.get("/", (req, res) => {
    Inquiry.find({}, (error, inquires) => {
        if (error) console.log(error);
        res.json(inquires);
    });
});

// POST /inquires
router.post("/", (req, res) => {
    const customerName = req.fields.customerName;
    const customerID = req.fields.customerID;
    const inquiryContent = req.fields.inquiryContent;
    const contactNumber = req.fields.contactNumber;

    const inquiry = new Inquiry({
        customerName: customerName,
        customerID: customerID,
        inquiryContent: inquiryContent,
        contactNumber: contactNumber,
    });

    inquiry.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /inquires/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const customerName = req.fields.customerName;
    const customerID = req.fields.customerID;
    const inquiryContent = req.fields.inquiryContent;
    const contactNumber = req.fields.contactNumber;

    Inquiry.findById(id, (error, inquiry) => {
        if (error) console.log(error);

        inquiry.customerName = customerName;
        inquiry.customerID = customerID;
        inquiry.inquiryContent = inquiryContent;
        inquiry.contactNumber = contactNumber;

        inquiry.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Inquiry.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
