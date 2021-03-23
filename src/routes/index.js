/**
* @desc Collects server routes.
* @return array
*/

const generateCodes = require('./generate-codes')
const getCode = require('./get-code')

module.exports = [
  generateCodes,
  getCode,
]