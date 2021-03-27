/**
* @desc Route middleware.
*/
const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/login.js')

router.get('/login', async (ctx, next) => {
  await controller(ctx)
  await next()
})

module.exports = router