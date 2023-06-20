const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

        

router.post('/', async (req, res) => {

    try {
        const { username, password} = req.body;
        
        // 10 is the saltround for bcryptjs 
        // 13 is the sweet spot the user will wait some time only when signup and login
        // the other option in hashing are scrypt 
        // argon2 is the best i think
        
        bcrypt.genSalt(10, function(err, salt) {

            if(err) console.error(err);
            bcrypt.hash(password, salt, function(err, hash) {

                if(err) console.error(err);
                let user = new User({
                    username,
                    password: hash,
                });

                user.save();
                res.json({_id: user._id, username: user.username, passwrod: user.password}); 
            });
        });
    }
    catch(err){
        console.error(err);
        res.json({error: err});
    }
});

module.exports = router;
