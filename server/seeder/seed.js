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
            console.debug('\x1b[32m', 'Finished with simple models', '\x1b[0m');
            console.debug('\x1b[35m', 'Creating related models...', '\x1b[0m');
            createRelatedModels()
                .then(data => {
                    seeder.disconnect();
                }).then(() => {
                    console.debug('\x1b[35m', 'Finished with related models', '\x1b[0m');
                    process.exit(0);
                });
        });
    });
});

async function createRelatedModels() {
    await Promise.all([
        require('./_employees.js')
    ]);
}