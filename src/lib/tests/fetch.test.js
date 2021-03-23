/**
* @desc Test fetch client.
*/
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')

const fetchComponent = require('../fetch')

describe('fetch client', () => {
  beforeEach(() => {
    fetchMock.mockClear()
  })
  it('should successfully answer 200', async () => {
    fetchMock.get('http://success.req', () => JSON.stringify({ great: 'success' }))
    let res = await fetchComponent('http://success.req')
    res = await res.json()
    expect(await res.great).toEqual('success')
  })
  it('should answer 404 on not found request', async () => {
    fetchMock.get('http://not-found.req', () => 404)
    let res = null
    try {
      res = await fetchComponent('http://not-found.req')
    } catch(e) {
      res = e
    }
    expect(res.status).toBe(404)
  })
})

