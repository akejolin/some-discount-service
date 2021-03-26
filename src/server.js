/**
* @desc App server.
* @return Koa server
*/

const koa = require("koa")
const isEmpty = require('lodash.isempty')
const middlewares = require('./middlewares')
const routes = require('./routes')
const log = require('./utils/system.log')
const createDB = require('./lib/create-db')
const models = require('./models')

// Defines
const port = process.env.PORT || 8000
const app = new koa()

// Apply middleares
if (!isEmpty(middlewares)) {
  middlewares.forEach((middleware) => {
    if (middleware){
      app.use(middleware(app))
    }
  })
}

// Init db models
if (!isEmpty(models)) {
  models.forEach((item) => {
    const initData = item.initData ? [item.value] : []
    createDB('db', `${item.key}.json`, initData)
  })
}

// Apply endpoint routes
if (!isEmpty(routes)) {
  routes.forEach((route) => {
    app.use(route.routes())
  })
}

// Start server
const server = app.listen(port, () => {
  log.info(`Listening on port ${port}`)
})

// Export server for testing purposes
module.exports = server

