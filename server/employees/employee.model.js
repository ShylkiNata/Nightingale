const mongoose = require('mongoose');
const pagination = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
    full_name: { type: String, required: true },
    sex: { type: Boolean, required: true },
    contact_information: { type: String, required: true },
    salary: { type: Number, required: true },
    position: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
schema.set('useFindAndModify', false);
schema.plugin(pagination);

module.exports = mongoose.model('Employees', schema);