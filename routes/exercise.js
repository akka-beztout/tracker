const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Exercise = require('../models/exercise');

// update an exercies 
// Unlike PUT Request, PATCH does partial update e.g. Fields that need to be updated by the client, only that field is updated without modifying the other field

router.patch('/:exerciseId', async (req, res) => {
    try {
       let id = req.params.exerciseId; 
        const {description, duration, date} = req.body;
        const updateObj = {}
        if (description) updateObj['description'] = description;
        if (duration) updateObj['duration'] = duration;
        if (date) updateObj['date'] = date;

        let update = await Exercise.findOneAndUpdate({_id: id}, updateObj );
        if(update) {
            res.json(update);
        }
        else {
            res.send('User Not Found!');
        }
    }
    catch(err) {
        console.error(err);
        res.send(err);
    }
});

router.delete('/', async(req, res) => {

    try {
        const { description, duration, date} = req.body;

        const delexercise = await Exercise.deleteMany({description: description, duration: duration, date: date});
        console.log(req.body);
        res.json({delexercise});

    }
    catch(err) {
        console.error(err);
    }
});


router.delete('/:exerciseId', async (req, res) => {
    try {
        let id = req.params.exerciseId;
        
        const delexercise = await Exercise.deleteOne({_id: id});
        res.json({delexercise});
    }
    catch(err) {
        console.error(err);
        res.send(err);
    }
});

module.exports = router;

