/**
* @desc Collects server routes.
* @return array
*/

const feed = require('./feed')
const episode = require('./episode')

module.exports = [
  feed,
  episode,
]