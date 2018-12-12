const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiegeMapSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Mapname is required.']
    },
    description: {
        type: String,
        required: [true, 'Map description is required.']
    },
    imageLink: {
        type: String,
        required: [true, 'Link an online image to describe the operator.']
    },
    rankedAvailability: {
        type: Boolean,
        default: false
    }
});

const SiegeMap = mongoose.model('siegemap', SiegeMapSchema);

module.exports = SiegeMap;