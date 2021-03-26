/**
* @desc Test ctx respond function.
*/

const respondToClient = require('../utils/respond-to-client')

describe('respondToClient', () => {
  it('should return default status 200 when no status code was provided', () => {
    const mockCtx = { respondToClient }
    respondToClient(mockCtx, 'great success')
    expect(mockCtx.status).toEqual(200)
    expect(mockCtx.body).toEqual({response: "great success"})
  })
  it('should return status 200 with only data as body', () => {
    const mockCtx = { respondToClient }
    respondToClient(mockCtx, {only: 'data'})
    expect(mockCtx.status).toEqual(200)
    expect(mockCtx.body).toEqual({only: 'data'})
  })

  it('should return a standard message when data was not provided', () => {
    const mockCtx = { respondToClient }
    respondToClient(mockCtx, 206)
    expect(mockCtx.body).toEqual({response: "Partial Content" })
  })

  it('should return only data when status code and data was provided', () => {
    const mockCtx = { respondToClient }
    respondToClient(mockCtx, 206, {super: 'great'})
    expect(mockCtx.body).toEqual({super: 'great'})
  })

  it('should print error, status and 4xx error data when error occurred', () => {
    const mockCtx = { respondToClient }
    respondToClient(mockCtx, 404, 'could not be found' )
    expect(mockCtx.body).toEqual({error: "could not be found", status: 404})
  })

  it('should print error, status and 5xx error data when error occurred', () => {
    const mockCtx = { respondToClient }
    respondToClient(mockCtx, 500 )
    expect(mockCtx.body).toEqual({error: "Internal server error", status: 500})
  })

})
