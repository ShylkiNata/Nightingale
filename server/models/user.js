const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);