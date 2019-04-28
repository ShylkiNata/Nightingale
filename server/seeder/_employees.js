const db = require('../_helpers/db');
const {_} = require('underscore');

module.exports = getDocuments();

async function getDocuments() {
    setDateGenerator();

    const positions = await db.Position.find();
    const names = getNames();

    const models = names.map(async item => {
        const employee = {
            "full_name": item,
            "sex": _.sample([true, false]),
            "contact_information": `${item}'s Contact Information`,
            "salary": _.random(500, 3000),
            "position": _.sample(positions).id,
            "date_of_birth": _().randomDate()
        };

        const model = new db.Employee(employee);

        return model.save();
    });

    return await Promise.all(models);
}

function getNames() {
    return [
        "Antares Scorpii",
        "Fuyue Scorpii",
        "Canopus Carinae",
        "Sirius Canis",
        "Betelgeuse Orionis",
        "Vega Lyr"
    ];
}

function setDateGenerator() {
    const year = new Date().getFullYear();
    const [ start, end ] = [
        new Date(year-100, 0, 1),
        new Date(year-18, 12, 31)
    ];

    _.mixin({
        randomDate: function() {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }
    });
}