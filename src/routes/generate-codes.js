/**
* @desc Route middleware.
*/
const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/generate-codes.js')

router.post('/generate-codes', async (ctx, next) => {
  await controller(ctx)
  await next()
})

// Todo: remove this. This is for testing purpose
router.get('/generate-codes', async (ctx, next) => {
  await controller(ctx)
  await next()
})

module.exports = router