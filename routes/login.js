const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {

    try {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
        if(!user) {
            res.json({error: 'User Not Found!'});
        }
        else {

            bcrypt.compare(password, user.password, (err, resulat) => {
                if(err) console.error(err);
                if(resulat) {
                    res.json({username: user.username, id:user.id});
                }
                else {
                    res.json({error: 'Wrong Password'});
                }
            });
        }
    }
    catch(err) {
        console.error(err);
        res.json(err);
    }
        
});

module.exports = router;
