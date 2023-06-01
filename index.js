const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const mongoose = require('mongoose');
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
    const {id} = req.params;

});
// check the health of the connection to mongoose
app.get('/mongoose/health', (req, res) => {
    // if status is 1 then all good 
    res.json({status: mongoose.connection.readyState});
});
app.listen(PORT, () => {
    console.log(`your app is listening on port: ${PORT}...`)
});

