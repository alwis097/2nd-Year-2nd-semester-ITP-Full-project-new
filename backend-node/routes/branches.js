const express = require("express");
const router = express.Router();

const Branch = require("../models/branch");

// GET /branches
router.get("/", (req, res) => {
    Branch.find({}, (error, branches) => {
        if (error) console.log(error);
        res.json(branches);
    });
});

// POST /branches
router.post("/", (req, res) => {
    const name = req.fields.name;
    const email = req.fields.email;
    const address = req.fields.address;
    const phone = req.fields.phone;

    const branch = new Branch({
        name: name,
        email: email,
        address: address,
        phone: phone,
    });

    branch.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /branches/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const name = req.fields.name;
    const email = req.fields.email;
    const address = req.fields.address;
    const phone = req.fields.phone;

    Branch.findById(id, (error, branch) => {
        if (error) console.log(error);

        branch.name = name;
        branch.email = email;
        branch.address = address;
        branch.phone = phone;

        branch.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Branch.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
