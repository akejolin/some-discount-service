/**
* @desc Will generate X amount of codes
*/

const get = require('lodash.get')
const generateCode = require('../lib/generate/generate')
const findLatestId = require('../utils/find-latest-id')
const DBmodel = require('../models/codes')
const writeDB = require('../lib/db/write-db')
const getItemDB = require('../lib/db/get-item-db')
const getItemsDB = require('../lib/db/get-items-db')
const log = require('../utils/system.log')


module.exports = async (ctx) => {

  // Collect params
  const params = {
    brandId: get(ctx, 'body.brand_id', null) !== null ? get(ctx, 'body.brand_id', null) : get(ctx, 'query.brand_id', null),
    amount: get(ctx, 'body.amount', null) !== null ? get(ctx, 'body.amount', null) : get(ctx, 'query.amount', null)
  }

  // Param validation
  if (params.brandId === null) {
    return ctx.respondToClient(ctx, 400 , `BrandId param is missing`)
  }

  if (params.brandId === '') {
    return ctx.respondToClient(ctx, 400 , `BrandId param was provided but with empty value`)
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
  let brand = await getItemDB('brands.json', 'id', Number(params.brandId))
  
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

  let inDB = await getItemsDB('codes.json', 'brandId', brand.id)
  inDB = inDB.filter(item => !item.isUsed)
  if (Number(inDB.length) >= Number(brand.maxActiveCodes)) {
    return ctx.respondToClient(ctx, 403, 'Maximum amount of codes is eceeded')
  } else {
    if ( Number(brand.maxActiveCodes) - Number(inDB.length) > 0 ) {
      if (Number(inDB.length) + portionToCreate > brand.maxActiveCodes) {
        portionToCreate = Number(brand.maxActiveCodes) - Number(inDB.length)
      }
    }
  }

  if (portionToCreate <= 0) {
    return ctx.respondToClient(ctx, 200, {error: 'Maximum amount of codes is eceeded', data: db})
  }

  // Get list of codes from DB
  let db = await getItemsDB('codes.json', '*', '*')
  // make a new instance
  db = db.slice()


  // Find out next id
  let nextId = db.length > 0 ? findLatestId(db) + 1 : 0

  const prepForRelationInsert = []

  // create loop

  const run = Array.from(Array(portionToCreate).keys())

  // Loop and generate new codes
  let promises = run.map(async () => {
    const code = await generateCode(nextId)
    // Create and push item to db
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
    prepForRelationInsert.push(output.id)

    nextId++
  })

  await Promise.all(promises)

  // Save codes
  await writeDB('db', 'codes.json', db)


  // Create releation between brand and code

  // Select all brand-code relations
  let brandCodeRelDB = null
  try {
    brandCodeRelDB = await getItemsDB('brand-code.json', '*', '*')
  } catch(error) {
    log.error(error)
  }

  // Find out next id
  nextId = brandCodeRelDB.length > 0 ? findLatestId(brandCodeRelDB) + 1 : 0
  promises = prepForRelationInsert.map(async (item) => {
    brandCodeRelDB.push({
      id: Number(nextId),
      codeId: Number(item),
      brandId: Number(brand.id),
    })
    nextId++
  })
  await Promise.all(promises)

  // Save codes
  await writeDB('db', 'brand-code.json', brandCodeRelDB)

  // Done
  return ctx.respondToClient(ctx, 200, db)
}