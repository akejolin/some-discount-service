
const path = require('path')


const fileRead = require('../utils/file.read')

module.exports = async (_diskPath, fileName) => new Promise(async (resolve, reject) => {
  const diskPath = path.resolve('.', _diskPath)
  const filePath = `${diskPath}/${fileName}`
  try {
    const data = await fileRead(filePath)
    resolve(JSON.parse(data))
  } catch(error) {
    throw new Error(`error reading db file: ${filePath}`)
  }
})