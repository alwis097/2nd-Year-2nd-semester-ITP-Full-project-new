const express = require("express");
const router = express.Router();

const User = require("../models/user");

// GET /users
router.get("/", (req, res) => {
    User.find({}, (error, users) => {
        if (error) console.log(error);
        res.json(users);
    });
});

// POST /users
router.post("/", (req, res) => {
    const name = req.fields.name;
    const address = req.fields.address;
    const contact = req.fields.contact;
    const email = req.fields.email;
    const password = req.fields.password;
    

    const user = new User({
        name: name,
        address: address,
        contact: contact,
        email: email,
        password: password,
    });

    user.save((error) => {
        if (error) console.log(error);
        res.status(201).end();
    });
});

// PUT /users/5
router.put("/:id", (req, res) => {
    const id = req.params.id;

    const name = req.fields.name;
    const address = req.fields.address;
    const contact = req.fields.contact;
    const email = req.fields.email;
    const password = req.fields.password;
    const wishlist = req.fields.wishlist;

    User.findById(id, (error, user) => {
        if (error) console.log(error);

        user.name = name;
        user.address = address;
        user.contact = contact;
        user.email = email;
        user.password = password;
        user.wishlist = wishlist;

        user.save((error) => {
            if (error) console.log(error);
            res.status(201).end();
        });
    });
});

// PUT /delete/5
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id, (error) => {
        if (error) {
            console.log(error);
        } else {
            res.status(204).end();
        }
    });
});

module.exports = router;
