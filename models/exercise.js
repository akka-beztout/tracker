const mongoose = require('mongoose');
const {Schema} = mongoose;

// exercise Schema 
const ExerciseSchema = new Schema({
    userId: {type: String, require: true},
    description: String,
    duration: Number,
    date: Date
});

// exercise model
module.exports = mongoose.model('Exercise', ExerciseSchema);

