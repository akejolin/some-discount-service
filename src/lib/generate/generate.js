/**
* @desc generate hash code.
* @return string - hash
*/


const crypto = require('crypto')
const randomBetween = require('../../utils/random-between')

module.exports = (salt) => new Promise(async (resolve, reject) => {

  const random = randomBetween(0,100000)
  const generateChecksum = (str, algorithm, encoding) => crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')

  try {
    const hash = generateChecksum(`some-key-${salt}-${random}`)
    resolve(hash)
  } catch (error) {
    throw new Error(error)
  }
})

