/**
* @desc Will generate X amount of codes
*/

const get = require('lodash.get')
const generateCode = require('../lib/generate/generate')
const findLatestId = require('../utils/find-latest-id')
const DBmodel = require('../models/codes')
const readDB = require('../lib/read-db')
const addToDB = require('../lib/add-list-to-db')
const writeDB = require('../lib/write-db')
const getItemDB = require('../lib/get-item-db')
const getItemsDB = require('../lib/get-items-db')


module.exports = async (ctx) => {

  const params = {
    brand: get(ctx, 'query.brand', null),
    amount: get(ctx, 'query.amount', null)
  }

  // Param validation
  if (params.brand === null) {
    return ctx.respondToClient(ctx, 400 , `Brand param is missing`)
  }

  if (params.brand === '') {
    return ctx.respondToClient(ctx, 400 , `Brand param was provided but with empty value`)
  }

  if (params.amount === null) {
    return ctx.respondToClient(ctx, 400 , `Amount param is missing`)
  }

  if (params.amount === '') {
    return ctx.respondToClient(ctx, 400 , `Amount param was provided but with empty value`)
  }

  if (Math.floor(Number(params.amount) + 0) !== Number(params.amount)) {
    return ctx.respondToClient(ctx, 400 , `Amount param that was provided is not a number`)
  }

  // Get info about brand
  let brand = await getItemDB('brands.json', 'slug', params.brand)
  
  // Exit if brand was not found

  if (brand === null) {
    ctx.respondToClient(ctx, 404, 'Brand not found')
    return
  }

  // ** Find out how many codes should be created ** 

  // Set default portion to requested amount
  let portionToCreate = Number(params.amount)

  /*
   * Make a check so maximum amount has not been eceeded. It will
   * also lower new portion (if portion together with amount of active codes in db)
   * is greater than limit
   */
   let inDB = await getItemsDB('codes.json', 'brand', 'blocket')
  inDB = inDB.filter(item => !item.isUsed)
  if (Number(inDB.length) >= Number(brand.maxActiveCodes)) {
    ctx.respondToClient(ctx, 403, 'Maximum amount of codes is eceeded')
    return
  } else {
    if ( Number(brand.maxActiveCodes) - Number(inDB.length) > 0 ) {
      if (Number(inDB.length) + portionToCreate > brand.maxActiveCodes) {
        portionToCreate = Number(brand.maxActiveCodes) - Number(inDB.length)
      }
    }
  }

  if (portionToCreate <= 0) {
    ctx.respondToClient(ctx, 200, {error: 'Maximum amount of codes is eceeded', data: db})
    return
  }

  // Get list of codes from DB
  let db = await getItemsDB('codes.json', '*', '*')
  // make a new instance
  db = db.slice()


  // Find out next id
  let nextId = db.length > 0 ? findLatestId(db) + 1 : 0

  // Loop and generate new codes

  const run = Array.from(Array(portionToCreate).keys())
  const promises = run.map(async () => {
    const code = await generateCode(nextId)
    const output = {
      ...DBmodel,
      ...{
        id: nextId,
        code,
        brand: brand.slug,
        brandId: brand.id
      }
    }
    db.push(output)
    nextId++
  })

  await Promise.all(promises)

  // Save codes
  await writeDB('db', 'codes.json', db)
 
  return ctx.respondToClient(ctx, 200, db)
}