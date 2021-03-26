/**
* @desc Test to generate checksum of a file.
*/
const path = require('path')


const generateChecksum = require('./generate')

describe('generate.js', () => {

  it('should generate a hash', async () => {

    let checksum = null
    try {
      checksum = await generateChecksum()
    } catch(error) {
      throw new Error(`${error}`)
    }

    expect(checksum).toEqual({checksum: "b10a8db164e0754105b7a99be72e3fe5", url: "https://some.url.com"})
  })
})
