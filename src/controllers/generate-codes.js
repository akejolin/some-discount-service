/**
* @desc Will generate X amount of codes
*/

const get = require('lodash.get')
const generateCode = require('../lib/generate/generate')
const randowmBetween = require('../utils/random-between')
const ReadFile = require('../utils/file.read')


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


  // Loop and generate new codes


  // Save codes

  const codes = await Promise.all(promises).then(item => item)

  return ctx.respondToClient(ctx, 200, {data: codes})
}