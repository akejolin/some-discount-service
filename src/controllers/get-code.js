/**
* @desc get a discount code
*/

const get = require('lodash.get')
const getItemDB = require('../lib/db/get-item-db')


module.exports = async (ctx) => {

  const params = {
    code: get(ctx, 'query.code', null),
    userId: get(ctx, 'query.user_id', null),
  }

  // Param validation
  if (params.code === null) {
    return ctx.respondToClient(ctx, 400 , `code param is missing`)
  }

  if (params.code === '') {
    return ctx.respondToClient(ctx, 400 , `code param was provided but with empty value`)
  }

  // Param validation
  if (params.userid === null) {
    return ctx.respondToClient(ctx, 400 , `userid param is missing`)
  }

  if (params.userid === '') {
    return ctx.respondToClient(ctx, 400 , `userid param was provided but with empty value`)
  }

  let discountCode = null
  try {
    discountCode = await getItemDB('codes.json', 'code', params.code)
  } catch(error) {
    console.error(error)
  }

  if (discountCode) {
    return ctx.respondToClient(ctx, 200, {
      response: {
        status: 'valid',
        code: discountCode.code,
        discount: Number(discountCode.rate),
        message: `Congratulation, you will get a discount of ${Math.floor(discountCode.rate*100)}% on the total price.`
      }
    })
  } else {
    return ctx.respondToClient(ctx, 400, 'Provided code is invalid')
  }

}