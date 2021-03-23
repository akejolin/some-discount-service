/**
* @desc Collects init function to initially insert data into DB.
* @return array
*/

const users = require('./users')
const brands = require('./brands')


module.exports = [
  users,
  brands,
]