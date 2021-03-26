/**
* @desc Test function to check if loadCache function is able to import data
*/

const loadChecksumCache = require('./load-cache')

describe('loadCache', () => {

  describe('loadCache', () => {
    it('should load some data from a file on disk', async () => {
      const cache = await loadChecksumCache('mock', 'test-cache-file.json')
      expect(cache).toEqual([{checksum:"02a81a82a97ca8d4530694c6c0b76671",url:"e7163730fca76f628e8a2a51da9b6f77"}])
    })
    it('should return an array even on errors', async () => {
      let cache = null
      try {
        cache = await loadChecksumCache('mock', 'some-mystic-file-not-on-disk.json')
      } catch (error) {
        cache = error
      }

      expect(cache).toEqual([])
    })
  })
})




