const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});




app.listen(PORT, () => {
    console.log(`your app is listening on port: ${PORT}...`)
});

