/**
* @desc Save checksum to array in cache-file.
* @param array $_checksumObj - object containing checksum, date and url
* @param date $date - originated from Date header of file fetch request
* @param array $dir - name of targeted dir on disk
* @return void
*/


const path = require('path')
const crypto = require('crypto')

const fileRead = require('../../utils/file.read')
const fileWrite = require('../../utils/file.write')

module.exports = async (_checksumObj, date, dir='cache') => {
  const diskPath = path.resolve('.', dir)
  const filePath = `${diskPath}/checksum-file-cache.json`
  let list = []

  const data = await fileRead(filePath)
  list = JSON.parse(data)

  const checksumObj = _checksumObj
  checksumObj.url = crypto.createHash('md5').update(_checksumObj.url).digest("hex")
  checksumObj.date = date
  list = list.filter(item => item.url !== checksumObj.url)
  list.push(checksumObj)

  await fileWrite(filePath, JSON.stringify(list))

}