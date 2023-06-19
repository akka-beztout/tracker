const mongoose = require('mongoose');
const {Schema} = mongoose;

// user Schema
const userSchema = new Schema({

    username: { type: String, require: true},
    password: { type: String, require: true},
});

// creating the model
module.exports = mongoose.model('User', userSchema);

