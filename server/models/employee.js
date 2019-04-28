const mongoose = require('mongoose');
const pagination = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    contact_information: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    position: {
        ref: 'Position',
        type: mongoose.Schema.Types.ObjectId
    }
});

schema.plugin(pagination);

module.exports = mongoose.model('Employees', schema);