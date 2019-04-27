const db = require('_helpers/db');
const Position = db.Position;

module.exports = {
    read
};

async function read() {
    return await Position.find();
}