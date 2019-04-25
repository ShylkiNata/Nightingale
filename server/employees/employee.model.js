const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    full_name: { type: String, required: true },
    sex: { type: Boolean, required: true },
    contact_information: { type: String, required: true },
    salary: { type: mongoose.Decimal128, required: true },
    position: { type: String, required: true },
    created: { type: Date, default: Date.now, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Employee', schema);