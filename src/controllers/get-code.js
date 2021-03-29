/**
* @desc get a discount code
* param: @object - ctx, koa context middleware object
* @return void
*/

const get = require('lodash.get')
const getItemsDB = require('../lib/db/get-items-db')
const writeDB = require('../lib/db/write-db')
const findLatestId = require('../utils/find-latest-id')
const log = require('../utils/system.log')

module.exports = async (ctx) => {

  // Collect params
  const params = {
    brandId: get(ctx, 'body.brand_id', null) !== null ? get(ctx, 'query.brand_id', null) : get(ctx, 'query.brand_id', null),
    userId: get(ctx, 'body.user_id', null) !== null ? get(ctx, 'body.user_id', null) : get(ctx, 'query.user_id', null),
  }

  // Param code validation
  if (params.brandId === null) {
    return ctx.respondToClient(ctx, 400 , `brand_id param is missing`)
  }

  if (params.brandId === '') {
    return ctx.respondToClient(ctx, 400 , `brand_id param was provided but with empty value`)
  }

  // Param userId validation
  if (params.userId === null) {
    return ctx.respondToClient(ctx, 400 , `user_id param is missing`)
  }

  if (params.userId === '') {
    return ctx.respondToClient(ctx, 400 , `user_id param was provided but with empty value`)
  }


  // Select all user code relations
  let userCodeRelDB = null
  try {
    userCodeRelDB = await getItemsDB('user-code.json', '*', '*')
  } catch(error) {
    console.error(error)
  }

  // Search for available codes
  let discountCodes = []
  try {
    discountCodes = await getItemsDB('codes.json', 'brandId', Number(params.brandId))
  } catch(error) {
    log.error(error)
  }

  // Remove all used and claimed codes
  discountCodes = discountCodes.map(code => {
    const isClaimed = userCodeRelDB.find(rel => Number(rel.codeId) === Number(code.id))
    if (isClaimed) {
      code.isClaimed = true
    }
    code.isClaimed = isClaimed ? true : false
    return code
  })

  // Remove all unavailable codes
  discountCodes = discountCodes.filter(dc => !dc.isClaimed && !dc.isUsed)

  // Abort if not found
  if (discountCodes.length < 1) {
    return ctx.respondToClient(ctx, 400, 'No available codes')
  }

  // Select and claim first available code
  const checkForFirstAvailable = discountCodes.find((dc) => !dc.isClaimed && !dc.isUsed)
  let claimedCode = null
  if (checkForFirstAvailable) {
    claimedCode = checkForFirstAvailable
  }

  // ** Time to update DB **

  // Find out next id for updating
  let nextId = userCodeRelDB.length > 0 ? findLatestId(userCodeRelDB) + 1 : 0

  // Create relation
  userCodeRelDB.push({
    id: nextId,
    codeId: claimedCode.id,
    userId: Number(params.userId),
  })

  // Save whole user-code relation list
  await writeDB('db', 'user-code.json', userCodeRelDB)

  // Respond to user and finish
  return ctx.respondToClient(ctx, 200, {
    status: 'valid',
    code: claimedCode.code,
    message: `You have got a code to use for a discount on a purchase.`
  })
}