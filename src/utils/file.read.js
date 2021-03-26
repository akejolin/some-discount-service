/**
* @desc read from txt file on disk
* @param string $file - full file path on disk,
* @return string - file content
*/

const fs = require('fs')

module.exports = async (file) => new Promise((resolve, reject) => fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    throw new Error(err)
  }
  resolve(data)
}))
