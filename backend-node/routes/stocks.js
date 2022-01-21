const express = require("express");
const router = express.Router();

const Stock = require("../models/stock");

// GET /stocks
router.get("/", (req, res) => {
    Stock.find({}, (error, stocks) => {
        if (error) console.log(error);
        res.json(stocks);
    });
});

// POST /stocks
router.post("/", (req, res) => {
    const product = req.fields.product;
    const quantity = req.fields.quantity;

    const stock = new Stock({
        product: product,
        quantity: quantity,
    });

    stock.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /stocks/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const product = req.fields.product;
    const quantity = req.fields.quantity;

    Stock.findById(id, (error, stock) => {
        if (error) console.log(error);

        stock.product = product;
        stock.quantity = quantity;

        stock.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Stock.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
