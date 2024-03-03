const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    cost: {
        type: Number,
        required: true,
    },
    sales: {
        type: Number,
        required: true,
    },

})

const menuItem = mongoose.model('menuItem', menuSchema);
module.exports = menuItem;