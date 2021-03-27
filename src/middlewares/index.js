/**
* @desc Sets load order of server middlewares.
* @return array
*/

const bodyParser = require('koa-bodyparser')
const healthcheck = require('./system.healthcheck')
const respondToClient = require('./respond-to-client')
const auth = require('./auth-jwt')

module.exports = [
  respondToClient,
  //auth,
  () => healthcheck,
  () => bodyParser(),

]