const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.URI);

const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercise');


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
/*
    true - for nested data structures
    false - for name value pairs
*/
app.use(bodyParser.json());
app.use(cors());

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/users", userRouter);
app.use("/exercise", exerciseRouter);

const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});



// check the health of the connection to mongoose
app.get('/mongoose/health', (req, res) => {
    // if status is 1 then all good 
    res.json({status: mongoose.connection.readyState});
});
app.listen(PORT, () => {
    console.log(`your app is listening on port: ${PORT}...`)
});

