
const path = require('path')


const fileRead = require('../utils/file.read')

module.exports = async (dirName, fileName) => new Promise(async (resolve) => {
  const diskPath = path.resolve('.', dirName)
  const filePath = `${diskPath}/${fileName}`
  try {
    const data = await fileRead(filePath)
    resolve(JSON.parse(data))
  } catch(error) {
    throw new Error(`error reading db file: ${filePath}`)
  }
})