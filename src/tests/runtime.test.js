/* eslint-disable jest/expect-expect, jest/no-done-callback */

const request = require('supertest')

describe('server', () => {
  let server = null

  beforeEach(() => {
    server = require('../server')
  })

  afterEach(() => {
    server.close()
  })

  it('should respond 200 on a /get-code request', (status) => {
    request(server)
      .get('/get-code')
      .expect(200, status)
  })

  it('should respond 200 on /generate-codes request', (status) => {
    request(server)
      .get('/feed?url=https://www.reddit.com/.rss')
      .expect(200, status)
  })
})
