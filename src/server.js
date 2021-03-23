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

if (!isEmpty(middlewares)) {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}

const db = require("./models")
const initial = require("./config/initial-db")

db.sequelize.sync({force: true}).then(() => {
  log.info('Drop and Resync Db');
  if (!isEmpty(initial)) {
    initial.forEach((init) => {
      init()
    })
  }
})

if (!isEmpty(routes)) {
  routes.forEach((route) => {
    app.use(route.routes())
  })
}

const server = app.listen(port, () => {
  log.info(`Listening on port ${port}`)
})

module.exports = server

