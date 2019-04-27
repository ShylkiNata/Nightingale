const db = require('../_helpers/db');
const {_} = require('underscore');

module.exports = getDocuments();

async function getDocuments() {
  return await db.Position.find().then(positions => {
    return getEmployees(positions);
  });
}

async function getEmployees(positions) {
  const names = [
    "Antares Scorpii",
    "Fuyue Scorpii",
    "Canopus Carinae",
    "Sirius Canis",
    "Betelgeuse Orionis",
    "Vega Lyr"
  ];

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

  names.forEach(async item => {
    const employee = {
      "full_name": item,
      "sex": _.sample([true, false]),
      "contact_information": `${item}'s Contact Information`,
      "salary": _.random(500, 3000),
      "position": _.sample(positions).id,
      "date_of_birth": _().randomDate()
    };

    const model = await new db.Employee(employee);
    model.save();
  });
}