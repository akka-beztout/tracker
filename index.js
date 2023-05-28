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

// check the health of the connection to mongoose
app.get('/mongoose/health', (req, res) => {
    // if status is 1 then all good 
    res.json({status: mongoose.connection.readyState});
});
app.listen(PORT, () => {
    console.log(`your app is listening on port: ${PORT}...`)
});

