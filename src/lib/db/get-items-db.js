/**
* @desc generate hash code.
* @return string - hash
*/

const readDB = require('./read-db')

module.exports = (haystack, key, needle) => new Promise(async (resolve) => {

  let db = []
  try {
    db = await readDB('db', haystack)
    db = db.slice()
  } catch(error) {
    console.info('brand was not found')
    db = []
  }

  if (needle === '*') {
    resolve(db)
  }
  
  const target = db.filter(item => item[key] === needle)
  
  resolve(target ? target : null)

})