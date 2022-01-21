const express = require("express");
const router = express.Router();

const Delivery = require("../models/delivery");

// GET /deliveries
router.get("/", (req, res) => {
    Delivery.find({}, (error, deliverys) => {
        if (error) console.log(error);
        res.json(deliverys);
    });
});

// POST /deliveries
router.post("/", (req, res) => {
    const order = req.fields.order;
    const deliveryman = req.fields.deliveryman;
    const vehicleno = req.fields.vehicleno;
    const nic = req.fields.nic;
    const contact = req.fields.contact;
    const status = req.fields.status;

    const delivery = new Delivery({
        order: order,
        deliveryman: deliveryman,
        vehicleno: vehicleno,
        nic: nic,
        contact: contact,
        status: status,
    });

    delivery.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /deliveries/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const order = req.fields.order;
    const deliveryman = req.fields.deliveryman;
    const vehicleno = req.fields.vehicleno;
    const nic = req.fields.nic;
    const contact = req.fields.contact;
    const status = req.fields.status;

    Delivery.findById(id, (error, delivery) => {
        if (error) console.log(error);

        delivery.order = order;
        delivery.deliveryman = deliveryman;
        delivery.vehicleno = vehicleno;
        delivery.nic = nic;
        delivery.contact = contact;
        delivery.status = status;

        delivery.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Delivery.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
