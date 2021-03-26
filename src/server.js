/**
* @desc App server.
* @return server - for supertests
*/

const koa = require("koa")

const isEmpty = require('lodash.isempty')

const port = process.env.PORT || 8000

const app = new koa()

const middlewares = require('./middlewares')
const routes = require('./routes')
const log = require('./utils/system.log')
const respondToClient = require('./utils/respond-to-client')
const createDB = require('./lib/create-db')
const models = require('./models')

const get = require('lodash.get')

app.context.respondToClient = respondToClient

if (!isEmpty(middlewares)) {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

if (!isEmpty(models)) {
  models.forEach((item, i) => {
    const initData = item.initData ? [item.value] : []
    createDB('db', `${item.key}.json`, initData)
  })
}


if (!isEmpty(routes)) {
  routes.forEach((route) => {
    app.use(route.routes())
  })
}

const server = app.listen(port, () => {
  log.info(`Listening on port ${port}`)
})

module.exports = server

