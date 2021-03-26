/**
* @desc Collect models and output them into a key and value object in a list.
* @return array
*/

const codes = require('./codes')
const brands = require('./brands')

module.exports = [
 { key: 'codes', value: codes, initData: false},
 { key: 'brands', value: brands, initData: true},
]