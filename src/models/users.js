const bcrypt = require("bcryptjs")

module.exports = {
  id: 0,
  username: 'testy',
  email: 'testy@testy.com',
  password: bcrypt.hashSync('12345', 8),
}