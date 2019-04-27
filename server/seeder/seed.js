const config = require('../config.json');
const data = [
    require('./users.js'),
    require('./employees.json')
];

const seeder = require('mongoose-seed');

seeder.connect(config.url, function() {

    seeder.loadModels([
        './users/user.model.js',
        './employees/employee.model.js'
    ]);

    seeder.clearModels(['User', 'Employees'], function() {
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });
    });
});

