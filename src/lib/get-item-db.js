/**
* @desc generate hash code.
* @return string - hash
*/

const readDB = require('../lib/read-db')

module.exports = (haystack, key, needle) => new Promise(async (resolve) => {

  let db = null
  try {
    db = await readDB('db', haystack)
    db = db.slice()
  } catch(error) {
    console.info('brand was not found')
    db = []
  }

  const target = db.find(item => item[key] === needle)
  resolve(target ? target : null)

})