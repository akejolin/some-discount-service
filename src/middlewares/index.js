/**
* @desc Sets load order of server middlewares.
* @return array
*/

const bodyParser = require('koa-bodyparser')
const healthcheck = require('./system.healthcheck')

module.exports = [
  healthcheck,
  bodyParser(),
]