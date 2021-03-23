/**
* @desc Test that server can respond to health checks when healthy.
*/

const healthCheckMiddleware = require('../middlewares/system.healthcheck')

describe('healthCheck', () => {
  it('should respond 204 on a health check request', () => {
    const mockCtx = {
      request: {
        url: '/healthcheck',
        host: 'localhost',
      },
    }
    healthCheckMiddleware(mockCtx, jest.fn())

    expect(mockCtx.status).toEqual(204)
  })
})
