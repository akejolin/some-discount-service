const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const fileWrite = require('../../utils/file.write')


module.exports = async (dir, fileName, data) => {
  const diskPath = path.resolve('.', dir)
  const filePath = `${diskPath}/${fileName}`
  if (!fs.existsSync(diskPath)) {
    await shell.mkdir('-p', diskPath)
  }
  if (!fs.existsSync(filePath)) {
    await fileWrite(filePath, JSON.stringify(data))
  }
}