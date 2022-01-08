
const express = require('express');
const router =  express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


//add user 
  router.post("/register", async (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.type = req.body.type;
    newUser.password = await bcrypt.hash(req.body.password, 10)
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
            newUser.save()
                .then(result => res.status(201).json(result))
                .catch(err => res.status(500).json(err));
        }
        else {
            res.status(500).json("Email existe déjà");
        }
    });


})
//login
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({
            success: false,
            msg: "Veuillez vérifier votre adresse mail!",
        });
    }
    else {
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },
                    process.env.TOKEN_KEY, {
                    expiresIn: 86400
                });

                return res.json({ success: true, user, token: token });
            } else {
                res.status(401).send({ success: false, msg: 'Vérifier votre mot de passe!' });
            }
        })
    }
});

  module.exports = router;