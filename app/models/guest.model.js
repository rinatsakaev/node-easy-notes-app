const mongoose = require('mongoose');

const GuestSchema = mongoose.Schema({
    name: String,
    tableId: String,
    date: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Guest', GuestSchema);
