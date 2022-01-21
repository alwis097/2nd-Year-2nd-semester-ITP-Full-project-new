const express = require("express");
const { collection } = require("../models/order");
const router = express.Router();

const Order = require("../models/order");

// GET /orders
router.get("/", (req, res) => {
    Order.find({}, (error, orders) => {
        if (error) console.log(error);
        res.json(orders);
    });
});

// POST /orders
router.post("/", (req, res) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let datee = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    const date = year + "-" + month + "-" + datee;
    const name = req.fields.name;
    const email = req.fields.email;
    const contact = req.fields.contact;
    const address = req.fields.address;
    const cart = req.fields.cart;
    const total = req.fields.total;
    const feedback = "";

    

    const order = new Order({
        date: date,
        name: name,
        email: email,
        contact: contact,
        address: address,
        cart: cart,
        total: total,
        feedback: feedback,
    });

    order.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /orders
router.put("/:id", (req, res) => {
    const id = req.params.id;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let datee = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    const date = year + "-" + month + "-" + datee;
    const name = req.fields.name;
    const email = req.fields.email;
    const contact = req.fields.contact;
    const address = req.fields.address;
    const cart = req.fields.cart;
    const total = req.fields.total;
    const feedback = "";

    Order.findById(id, (error, order) => {
        if (error) console.log(error);
        order.date = date;
        order.name = name;
        order.email = email;
        order.contact = contact;
        order.address = address;
        order.cart = cart;
        order.total = total;
        order.feedback = feedback;

        order.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /orders
router.put("/feedback/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    const feedback = req.fields.feedback;

    console.log(feedback);

    Order.findById(id, (error, order) => {
        if (error) console.log(error);

        order.feedback = feedback;

        order.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});


// PUT /orders
router.put("/removefeedback/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    const feedback = "";

    console.log(feedback);

    Order.findById(id, (error, order) => {
        if (error) console.log(error);

        order.feedback = feedback;

        order.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /orders
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Order.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});


module.exports = router;
