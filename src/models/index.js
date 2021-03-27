/**
* @desc Collect models and output them into a key and value object in a list.
* @return array
*/

const codes = require('./codes')
const brands = require('./brands')
const users = require('./users')
const userCode = require('./user-code')
const brandCode = require('./brand-code')

module.exports = [
 { key: 'codes', value: codes, initData: false},
 { key: 'brands', value: brands, initData: true},
 { key: 'brand-code', value: brandCode, initData: false},
 { key: 'users', value: users, initData: true},
 { key: 'user-code', value: userCode, initData: false},
]