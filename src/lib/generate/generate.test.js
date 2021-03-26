/**
* @desc Test to generate a hash code of a string, id and random number.
*/


const generateCode = require('./generate')

describe('generate function', () => {

  it('should generate a hash code', async () => {

    let hashCode = null
    try {
      hashCode = await generateCode(1)
    } catch(error) {
      throw new Error(`${error}`)
    }

    expect(hashCode.length).toEqual(32)
  })
})
