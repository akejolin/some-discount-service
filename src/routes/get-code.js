/**
* @desc Route middleware.
*/
const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/get-code.js')

router.get('/get-code', async (ctx, next) => {
  await controller(ctx)
  await next()
})

module.exports = router