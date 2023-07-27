const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const equipmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
    });

    const Equipment = model('Equipment', equipmentSchema);

    module.exports = Equipment;