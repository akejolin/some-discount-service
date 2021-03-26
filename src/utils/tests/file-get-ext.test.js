/**
* @desc Test get extension function of a url.
*/

const getFileExt = require('../file-get-ext')

describe('file.get-ext', () => {
  it('should extract an extension of an string url', () => {
    expect(getFileExt('https://some.url.to/media.mp3')).toEqual('mp3')
  })

  it('should be able to extract extension with length greater than 3', () => {
    expect(getFileExt('https://some.url.to/media.jpeg')).toEqual('jpeg')
  })

  it('should throw an error when url is an invalid file path', async() => {
    expect(() => {
      getFileExt('https://some.url.to/media')
    }).toThrow('There is no file extension in the url')
  })

  it('should throw type error when input is not a string', async() => {
    expect(() => {
      getFileExt({url:'https://some.url.to/media.mp3'})
    }).toThrow('Invalid path param to extract file ext')
  })
})
