/**
* @desc Collects server routes.
* @return array
*/

const generateCodes = require('./generate-codes')
const getCode = require('./get-code')
const login = require('./login')

module.exports = [
  generateCodes,
  getCode,
  login,
]