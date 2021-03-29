/**
* @desc write file to disk.
* @param string $dirName - name of dir,
* @param string $fileName - name of file,
* @param * $data - the data to be written,
* @return void
*/


const path = require('path')
const fs = require('fs')

module.exports = (dirName, fileName, data) => new Promise(async (resolve) => {
  const diskPath = path.resolve('.', dirName)
  const filePath = `${diskPath}/${fileName}`

  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
        throw new Error(err)
    }
    resolve()
  })

})

