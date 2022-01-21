const express = require("express");
const router = express.Router();

const Grn = require("../models/grn");
const Product = require("../models/product");

// GET /grns
router.get("/", (req, res) => {
    Grn.find({}, (error, grns) => {
        if (error) console.log(error);
        res.json(grns);
    });
});

// POST /grns
router.post("/", (req, res) => {
    const product = req.fields.product;
    const pname = req.fields.pname;
    const supplier = req.fields.supplier;
    const quantity = req.fields.quantity;
    const price = req.fields.price;
    const date = req.fields.date;

    const grn = new Grn({
        product: product,
        pname: pname,
        supplier: supplier,
        quantity: quantity,
        price: price,
        date: date,
    });

    grn.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });

    Product.findById(product, (error, product) => {
        if (error) res.status(500).send(error);
        product.quantity += parseInt(quantity);
        console.log(product.quantity);
        console.log(quantity);
        product.save((error) => {
            if (error) res.status(500).send(error);
            res.status(201).end();
        });
    });
});

// PUT /grns/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    

    const product = req.fields.product;

    console.log(product);
    const pname = req.fields.pname;
    const supplier = req.fields.supplier;
    const quantity = req.fields.quantity;
    const price = req.fields.price;
    const date = req.fields.date;
    gap = 0;

    Grn.findById(id, (error, grn) => {
        if (error) console.log(error);

        grn.product = product;
        grn.supplier = supplier;
        grn.pname = pname;

        gap = quantity - grn.quantity;

        grn.quantity = quantity;
        grn.price = price;
        grn.date = date;

        grn.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });

        Product.findById(product, (error, product) => {
            if (error) res.status(500).send(error);
            product.quantity += gap;
            product.save((error) => {
                if (error) res.status(500).send(error);
                res.status(201).end();
            });
        });
    });
});

// PUT /delete/5
router.put("/stock/:id", (req, res) => {
    const id = req.params.id;
    Grn.findById(id, (error, grn) => {
        if (error) console.log(error);

        console.log(grn.product)

        Product.findById(grn.product, (error, product) => {
            if (error) res.status(500).send(error);
            product.quantity -= grn.quantity;
            product.save((error) => {
                if (error) res.status(500).send(error);
                res.status(201).end();
            });
        });
    });

    Grn.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });


});

module.exports = router;
