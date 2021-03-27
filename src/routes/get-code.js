/**
* @desc Route middleware.
*/
const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/get-code.js')

router.put('/get-code', async (ctx, next) => {
  await controller(ctx)
  await next()
})

// Todo: remove this. This is for testing purpose
router.get('/get-code', async (ctx, next) => {
  await controller(ctx)
  await next()
})

module.exports = router