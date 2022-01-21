const express = require("express");
const router = express.Router();

const Supplier = require("../models/supplier");

// GET /suppliers
router.get("/", (req, res) => {
    Supplier.find({}, (error, suppliers) => {
        if (error) console.log(error);
        res.json(suppliers);
    });
});

// POST /suppliers
router.post("/", (req, res) => {
    const name = req.fields.name;
    const company_name = req.fields.company_name;
    const contact = req.fields.contact;
    const email = req.fields.email;
    const address = req.fields.address;

    const supplier = new Supplier({
        name: name,
        company_name: company_name,
        contact: contact,
        email: email,
        address: address,
    });

    supplier.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /suppliers/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const name = req.fields.name;
    const company_name = req.fields.company_name;
    const contact = req.fields.contact;
    const email = req.fields.email;
    const address = req.fields.address;

    Supplier.findById(id, (error, supplier) => {
        if (error) console.log(error);

        supplier.name = name;
        supplier.company_name = company_name;
        supplier.contact = contact;
        supplier.email = email;
        supplier.address = address;

        supplier.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Supplier.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
