const config = require('../config.json');
const seeder = require('mongoose-seed');

seeder.connect(config.url, function() {

    seeder.loadModels([
        './models/position.js',
        './models/user.js',
        './models/employee.js'
    ]);

    seeder.clearModels(['Position', 'User', 'Employees'], function() {
        seeder.populateModels([
            require('./_positions.json'),
            require('./_users.js'),
        ], () => {
            console.info('Running async seeder');
            runAsyncSeeders().then(() => {
                seeder.disconnect();
                console.info('Finished');
            });
        });
    });
});

async function runAsyncSeeders() {
    return await require('./_employees.js');
}