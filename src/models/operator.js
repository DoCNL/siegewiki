const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Season = require('./season');

const OperatorSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Operator name is required.']
    },
    description: {
        type: String,
        required: [true, 'Operator description is required.']
    },
    imageLink: {
        type: String,
        required: [true, 'Link an online image to describe the operator.']
    },
    season: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'season'
        }
    },
    side: {
        type: String,
        validate: {
            validator: (side) => side === 'Attacker' || side === 'Defender',
            message: 'An operator can only be an Attacker or Defender'
        },
    }
});

const Operator = mongoose.model('operator', OperatorSchema);

module.exports = Operator;