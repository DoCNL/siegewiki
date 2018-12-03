const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Operator = require('./operator');
const SiegeMap = require('./siegemap');

const SeasonSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Season name is required.']
    },
    description: {
        type: String,
        required: [true, 'Season description is required.']
    },
    imageLink: {
        type: String,
        required: [true, 'Link an online image to describe the operator.']
    },
    year: {
        type: Number,
        validate: {
            validator: (year) => year < 5, 
            message: 'Season year should be the year since the game is released.'
        },
        required: [true, 'Season year is required.']
    },
    operators: [Operator],
    map: SiegeMap
});

const Season = mongoose.model('season', SeasonSchema);

module.exports = Season;