const bcrypt = require('bcryptjs');

module.exports = {
  "model": "User",
  "documents": [
    {
      "login": "admin",
      "email": "admin@example.com",
      "password": bcrypt.hashSync("nightingale", 10)    }
  ]
};