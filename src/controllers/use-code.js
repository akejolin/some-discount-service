/**
* @desc get a discount code
* param: @object - ctx, koa context middleware object
* @return void
*/

const get = require('lodash.get')
const getItemDB = require('../lib/db/get-item-db')
const getItemsDB = require('../lib/db/get-items-db')
const writeDB = require('../lib/db/write-db')
const findLatestId = require('../utils/find-latest-id')
const log = require('../utils/system.log')

module.exports = async (ctx) => {

  // Collect params
  const params = {
    code: get(ctx, 'body.code', null) !== null ? get(ctx, 'query.code', null) : get(ctx, 'query.code', null),
    userId: get(ctx, 'body.user_id', null) !== null ? get(ctx, 'body.user_id', null) : get(ctx, 'query.user_id', null),
  }

  // Param code validation
  if (params.code === null) {
    return ctx.respondToClient(ctx, 400 , `code param is missing`)
  }

  if (params.code === '') {
    return ctx.respondToClient(ctx, 400 , `code param was provided but with empty value`)
  }

  // Param userId validation
  if (params.userId === null) {
    return ctx.respondToClient(ctx, 400 , `user_id param is missing`)
  }

  if (params.userId === '') {
    return ctx.respondToClient(ctx, 400 , `user_id param was provided but with empty value`)
  }

  // Select and match provided code in db
  let discountCode = null
  try {
    discountCode = await getItemDB('codes.json', 'code', params.code)
  } catch(error) {
    log.error(error)
  }

  // Abort if not found
  if (!discountCode) {
    return ctx.respondToClient(ctx, 400, 'Provided code is invalid')
  }

  // Abort if code has expired (alread used)
  if (discountCode.isUsed) {
    return ctx.respondToClient(ctx, 400, 'Provided code has expired')
  }

  // Mark codes as used
  discountCode.isUsed = true

  // Prep for save and select all codes again
  let codesDB = null
  try {
    codesDB = await getItemsDB('code.json', '*', '*')
  } catch(error) {
    console.error(error)
  }

  // Remove prev version of targeted code
  codesDB = codesDB.filter(item => item.id !== discountCode.id)
  
  // Update targeted code
  codesDB.push(discountCode)

  // Save whole user-code relation list
  await writeDB('db', 'codes.json', codesDB)

  // Respond to user and finish
  return ctx.respondToClient(ctx, 200, {
    status: 'valid',
    code: discountCode.code,
    discount: Number(discountCode.rate),
    message: `Congratulation, you will get a discount of ${Math.floor(discountCode.rate*100)}% on the total price.`
  })

}