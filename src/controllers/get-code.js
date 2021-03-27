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

  // Select all user code relations
  let userCodeRelDB = null
  try {
    userCodeRelDB = await getItemsDB('user-code.json', '*', '*')
  } catch(error) {
    console.error(error)
  }

  /* Check if code has already been used
   * It is enough to only look for if discountCode.id exist in the relation db because
   * Only one should be able to use one discount code
   */
  const codeHasExpired = userCodeRelDB.find(item => item.codeId === discountCode.id)

  // If found then abort
  if (codeHasExpired) {
    return ctx.respondToClient(ctx, 403, 'Provided code is expired')
  }

  // Find out next id
  let nextId = userCodeRelDB.length > 0 ? findLatestId(userCodeRelDB) + 1 : 0

  // Create relation
  userCodeRelDB.push({
    id: nextId,
    codeId: discountCode.id,
    userId: Number(params.userId),
  })

  // Save whole user-code relation list
  await writeDB('db', 'user-code.json', userCodeRelDB)

  // Respond to user and finish
  return ctx.respondToClient(ctx, 200, {
    status: 'valid',
    code: discountCode.code,
    discount: Number(discountCode.rate),
    message: `Congratulation, you will get a discount of ${Math.floor(discountCode.rate*100)}% on the total price.`
  })

}