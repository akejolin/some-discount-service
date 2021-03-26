/**
* @desc Will generate X amount of codes
*/

const get = require('lodash.get')
const generateCode = require('../lib/generate/generate')
const findLatestId = require('../utils/find-latest-id')
const DBmodel = require('../models/codes')
const readDB = require('../lib/read-db')
const writeDB = require('../lib/write-db')


module.exports = async (ctx) => {

  // Param validation
  if (get(ctx.request, 'query.brand', null) === null) {
    return ctx.respondToClient(ctx, 400 , `Brand param is missing`)
  }

  if (get(ctx.request, 'query.brand') === '') {
    return ctx.respondToClient(ctx, 400 , `Brand param was provided but with empty value`)
  }

  if (get(ctx.request, 'query.amount', null) === null) {
    return ctx.respondToClient(ctx, 400 , `Amount param is missing`)
  }

  if (get(ctx.request, 'query.amount') === '') {
    return ctx.respondToClient(ctx, 400 , `Amount param was provided but with empty value`)
  }

  // Get list of codes from DB
  let db = await readDB('db', 'codes.json') || []
  // make a new instance
  db = db.slice()

  // Find out next id
  let nextId = db.length > 0 ? findLatestId(db) + 1 : 0

 
  // Loop and generate new codes

  const promises = [1,2,3,4,5,6,7,8,9,10].map(async item => {
    const code = await generateCode(nextId)
    const output = {
      ...DBmodel,
      ...{
        id: nextId,
        code,
        brand: get(ctx.request, 'query.brand')
      }
    }
    db.push(output)
    nextId++
  })

  await Promise.all(promises)

  console.log(db)
  // Save codes
  await writeDB('db', 'codes.json', db)
 
  return ctx.respondToClient(ctx, 200, db)
}