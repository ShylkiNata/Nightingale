const config = require('config.json');
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || config.connectionString;
mongoose.connect(url, 
	{ 
		useCreateIndex: true, 
		useNewUrlParser: true 
	});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
	Employee: require('../employees/employee.model')
};