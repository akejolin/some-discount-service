/**
* @desc Extract file ext of an url.
* @param string $url - the target url to extract from
* @return string - success or failure
*/

module.exports = _path => {

  if (typeof _path !== 'string') {
    throw new TypeError('Invalid path param to extract file ext')
  }

  const arr = _path.split('/')
  const nameArr = arr[arr.length - 1].split('.')
  
  if (nameArr.length < 2) {
    throw new Error('There is no file extension in the url')
  }

  const ext = nameArr[nameArr.length - 1]
  return ext
}