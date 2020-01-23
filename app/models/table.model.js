const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
    capacity: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Table', TableSchema);
