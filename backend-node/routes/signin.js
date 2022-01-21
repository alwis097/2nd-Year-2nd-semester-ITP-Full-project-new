const express = require("express");
const router = express.Router();

const User = require("../models/user");

// POST /signin
router.post("/", (req, res) => {

    const temp = User.find({ email: req.fields.email, password: req.fields.password},  (error, data)=>{
        if(error){
            console.log(error);
        }else{
            if (data.length==1) {
                res.json({ success: true, user: data[0].name });
            } else {
                res.json({ success: false });
            }
        }
    });

    
});

module.exports = router;
