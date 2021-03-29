const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");


module.exports = (app) => async (ctx, next) => {

  app.context.setToken = (_token) => {
    app.context.token = _token
  }
  app.context.setUserId = (id) => {
    app.context.userId = id
  }

  if (ctx.request.url.startsWith('/login')) {
    return await next()
  }

  let token = ctx.token //||ctx.req.headers["Authorization"]
  if (!token) {
    return ctx.respondToClient(ctx, 403, `Token is missing: ${token}`)
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return ctx.respondToClient(ctx, 401)
    }

    ctx.setUserId(decoded.id)
    ctx.setToken(token)

    await next()
  })
}