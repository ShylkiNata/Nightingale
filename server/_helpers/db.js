const config = require('../config.json');
const mongoose = require('mongoose');

mongoose.connect(config.url,
	{ 
		useCreateIndex: true, 
		useNewUrlParser: true 
	});

mongoose.Promise = global.Promise;

mongoose.set('toJSON', { virtuals: true });
mongoose.set('useFindAndModify', false);

module.exports = {
	User: require('../models/user'),
	Employee: require('../models/employee'),
	Position: require('../models/position')
};