/**
* @desc Sets load order of server middlewares.
* @return array
*/

const bodyParser = require('koa-bodyparser')
const healthcheck = require('./system.healthcheck')
const respondToClient = require('./respond-to-client')

module.exports = [
  () => healthcheck,
  () => bodyParser(),
  respondToClient,

]