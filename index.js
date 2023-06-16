const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const mongoose = require('mongoose');
const { query } = require('express');
const { Schema } = mongoose;
mongoose.connect(process.env.URI);

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT;

// user Schema
const userSchema = new Schema({

    username: { type: String, require: true},
    password: { type: String, require: true},
});

// creating the model
const User = mongoose.model('User', userSchema);
// exercise Schema 
const ExerciseSchema = new Schema({
    userId: {type: String, require: true},
    description: String,
    duration: Number,
    date: Date
});
// exercise model
const Exercise = mongoose.model('Exercise', ExerciseSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/login', (req, res) => {

    try {
        const { username, password} = req.body;
    let user = new User({
        username,
        password,
    });
    user.save();
   res.json({_id: user._id, username: user.username, passwrod: user.password}); 
    }
    catch(err){
        console.error(err);
        res.json({error: err});
    }
});

app.get('/api/users', async (req, res) => {
    try {
    const query = await User.find({}).select({passwrod: -1, username: 1});
    res.json(query);
    }
    catch(err) {
        res.json({error: err});
    }
});

app.post('/api/users/:id/exercises', async (req, res) => {

    try {
    const {id} = req.params;
    const {description, duration, date} = req.body;
    const user = await User.findById(id);

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

app.get('/api/users/:_id/logs', async(req, res) => {
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
// update an exercies 
// Unlike PUT Request, PATCH does partial update e.g. Fields that need to be updated by the client, only that field is updated without modifying the other field

app.patch('/api/exercise/:_exerciseId', async (req, res) => {
    try {
       let id = req.params._exerciseId; 
        const {description, duration, date} = req.body;
        const updateObj = {}
        if (description) updateObj['description'] = description;
        if (duration) updateObj['duration'] = duration;
        if (date) updateObj['date'] = date;

        let update = await Exercise.findOneAndUpdate({_id: id}, updateObj );
        res.json(update);
    }
    catch(err) {
        console.error(err);
        res.send(err);
    }
});
// delete user 
app.delete('/api/users/:_id', async(req, res) => {

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
app.delete('/api/users/:_id/exercise', async(req, res) => {

    try {
        const { description, duration, date} = req.body;

        const delexercise = await Exercise.deleteOne({description: description, duration: duration, date: date});
        res.json({delexercise});

    }
    catch(err) {
        console.error(err);
    }
});

app.delete('/api/exercise/:_exerciseId', async (req, res) => {
    try {
        let id = req.params._exerciseId;
        
        const delexercise = await Exercise.deleteOne({_id: id});
        res.json({delexercise});
    }
    catch(err) {
        console.error(err);
        res.send(err);
    }
});

// check the health of the connection to mongoose
app.get('/mongoose/health', (req, res) => {
    // if status is 1 then all good 
    res.json({status: mongoose.connection.readyState});
});
app.listen(PORT, () => {
    console.log(`your app is listening on port: ${PORT}...`)
});

