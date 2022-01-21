const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const appDir = path.dirname(require.main.filename);

const WishList = require("../models/wishlist");

// GET /WishList
router.get("/", (req, res) => {
    const p = req.query.p ? req.query.p : 1;
    WishList.find({}, (error, WishLists) => {
        if (error) console.log(error);
        res.json(WishLists);
    })
        .skip((p - 1) * 4)
        .limit(4);
});


// POST /WishList
router.post("/", (req, res) => {
    const username = req.fields.username;
    const name = req.fields.name;
    const category = req.fields.category;
    const description = req.fields.description;
    const imageUpload = req.files.imageUpload;
    let image = imageUpload ? imageUpload.name : "noimage.png";
    const price = req.fields.price;

    if (image !== "noimage.png") {
        image = +new Date() + "_" + image;
        const oldPath = imageUpload.path;
        const newPath = `${appDir}/public/media/products/${image}`;
        const rawData = fs.readFileSync(oldPath);

        fs.writeFile(newPath, rawData, (error) => {
            if (error) res.status(500).send(error);
        });
    }

    const wishList = new WishList({
        name: name,
        category: category,
        description: description,
        image: image,
        price: price,
    });

    wishList.save((error) => {
        if (error) res.status(500).send(error);
        res.status(201).end();
    });
});

// PUT /WishList
router.put("/", (req, res) => {
    const id = req.fields.id;
    const name = req.fields.name;
    const category = req.fields.category;
    const description = req.fields.description;
    const imageUpload = req.files.imageUpload;
    const price = req.fields.price;

    WishList.findById(id, (error, wishList) => {
        if (error) res.status(500).send(error);

        if (imageUpload) {
            if (wishList.image != "noimage.png") {
                const imagePath = `${appDir}/public/media/products/${wishList.image}`;
                fs.unlink(imagePath, (error) => {
                    if (error) res.status(500).send(error);
                });
            }

            const image = +new Date() + "_" + imageUpload.name;
            const oldPath = imageUpload.path;
            const newPath = `${appDir}/public/media/products/${image}`;
            const rawData = fs.readFileSync(oldPath);

            fs.writeFile(newPath, rawData, (error) => {
                if (error) res.status(500).send(error);
            });

            wishList.image = image;
        }

        wishList.name = name;
        wishList.category = category;
        wishList.description = description;
        wishList.price = price;

        wishList.save((error) => {
            if (error) res.status(500).send(error);
            res.status(201).end();
        });
    });
});

// DELETE /WishList/5
router.delete("/:id", (req, res) => {
    WishList.findById(req.params.id, (error, wishList) => {
        if (error) res.status(500).send(error);

        if (wishList.image != "noimage.png") {
            const imagePath = `${appDir}/public/media/products/${wishList.image}`;
            fs.unlink(imagePath, (error) => {
                if (error) res.status(500).send(error);
            });
        }

        wishList.remove();
        res.status(204).end();
    });
});

module.exports = router;
