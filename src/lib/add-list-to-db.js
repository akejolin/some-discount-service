/**
* @desc prepare write array to file to disk.
* @param string $dirName - name of dir,
* @param string $fileName - name of file,
* @param * $data - the data to be written,
* @return void
*/


const readDB = require('./read-db')
const writeDB = require('./write-db')
const findLatestId = require('../utils/find-latest-id')

module.exports = (dirName, fileName, data) => new Promise(async (resolve, reject) => {

  if (!Array.isArray(data)) {
    throw new TypeError(`Data is not an array.`)
  }

  let db = []
  try {
    db = await readDB(dirName, fileName)
  } catch(error) {
    db = []
  }

  // Before actions find out latest id in DB
  let nextId = db.length > 0 ? findLatestId(db) + 1 : 0

  let result = []

  // Remove all existing
  data.forEach(toDB => {
    result = db.filter(inDB => inDB.id === toDB.id)
  })

  // Add all new data + add incremental id
  data.forEach(toDB => {
    toDB.id = nextId
    result.push(toDB)
    nextId++
  })

  try {
    await writeDB(dirName, fileName, result)
    resolve()
  } catch(error) {
    reject(`Could not write from db file (${fileName})`)
  }

})

