/**
* @desc Attach response to client function koa application context
* @param object $app - koa application
* @return void
*/

const respondToClient = require('../utils/respond-to-client')

module.exports = (app) => {
  app.context.respondToClient = respondToClient
  return (ctx, next) => next()
}
