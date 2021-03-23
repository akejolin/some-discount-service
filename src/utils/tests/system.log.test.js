/**
* @desc Test so log system has required functions.
*/

const log = require('../utils/system.log')

describe('log', () => {
  it('should have certain log functions', () => {

    expect(typeof log.log).toEqual('function')
    expect(typeof log.error).toEqual('function')
    expect(typeof log.info).toEqual('function')
  })
})
