/**
* @desc write to txt file on disk
* @param string $file - full file path on disk,
* @return void
*/

const fs = require('fs')

module.exports = (file, data) => fs.writeFile(file, data, (err) => {
  if (err) {
      throw new Error(err)
  }
})