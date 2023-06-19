const express = require('express')
const router = express.Router();

const User = require('../models/user');
const Exercise = require('../models/exercise');

router.get('/', async (req, res) => {
    try {
    const query = await User.find({}).select({passwrod: -1, username: 1});
    res.json(query);
    }
    catch(err) {
        res.json({error: err});
    }
});

router.post('/:id/exercises', async (req, res) => {

    try {
    const {id} = req.params;
    const {description, duration, date} = req.body;
    const user = await User.findById(id);

        console.log(req.body);

    let exercise = new Exercise({
        userId: id,
        description,
        duration,
        date: date? new Date(date): new Date,
         });
        exercise.save();
    res.json({
        username: user.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString(),
        _id: user._id,
    });
    }
    catch(err) {
        console.error(err);
        res.json({error: err});
    }
});

router.get('/:_id/logs', async(req, res) => {
    try {

        const id = req.params._id;
        const {from, to, limit} = req.query;

        const user = await User.findById(id);

        let queryObj = {};
        queryObj['userId'] = id;
        if(from) {
            queryObj['date'] = {
                $gt: from,
            }
        }
        if(to) {
            queryObj['date'] = {
                ...queryObj['date'], $lt: to,
            }
        }
        
        //const exercise = await Exercise.find({userId : id})
        const exercise = await Exercise.find(queryObj).limit(limit);

        const log = exercise.map((item) => {
            
            return {
                description: item.description,
                duration: item.duration,
                date: item.date.toDateString(),
                id: item._id,
            }
        });
        res.json({
            username: user.username,
            count: exercise.length,
            _id: user._id,
            log: log,
        });
    }
    catch(err) {
        console.error(err);
        res.json({error: 'User not Found!'});
    }
});

// delete user 
router.delete('/:_id', async(req, res) => {

    const id = req.params._id;
    try {
        const delexercise = await Exercise.deleteMany({userId: id});
        const deluser = await User.deleteOne({_id: id});
        res.json({deleted_users: deluser, deleted_exercises: delexercise.deletedCount});
    }
    catch(err) {
        console.error(err);
    }
});
router.delete('/:_id/exercise', async(req, res) => {

    try {
        const { description, duration, date} = req.body;

        const delexercise = await Exercise.deleteOne({description: description, duration: duration, date: date});
        res.json({delexercise});

    }
    catch(err) {
        console.error(err);
    }
});

module.exports = router;





