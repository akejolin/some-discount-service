/**
* @desc Create response to send data to client.
* @param object $ctx - koa middleware context
* @param * $data - data to be sent
* @return void
*/
const get = require('lodash.get')

const REST_CODES = require('./rest-codes')

module.exports = (ctx, status=200, data=null) => {
  let statusCode = status
  let output = data
  if (typeof statusCode !== 'number') {
    output = statusCode
    statusCode = 200
  }

  if (typeof status === 'number' && data === null) {
    output = REST_CODES[statusCode]
  }
  const errorRegExp = /[45][01][0123456789]/
  const successRegExp = /[2]0[01]/
  if (errorRegExp.test(`${statusCode}`)) {
    output = {
      ...{error: output},
      ...{status: statusCode}
    }
  } else if (successRegExp.test(`${statusCode}`)) {
    output = output
  }

  if (typeof output !== 'object') {
    output = {response: output}
  }
  ctx.status = statusCode
  ctx.body = output
}