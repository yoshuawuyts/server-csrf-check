const isReq = require('is-incoming-message')
const isRes = require('is-server-response')
const Cookies = require('cookies')
const assert = require('assert')

module.exports = serverCsrfCheck

// Validate a client-side CSRF token on a server
// (obj, obj) -> bool
function serverCsrfCheck (req, res) {
  assert.ok(isReq(req), 'is req')
  assert.ok(isRes(res), 'is res')

  const header = req.headers['x-csrf-token']
  if (!header) return false

  const cookies = new Cookies(req, res)
  const cookie = cookies.get('CSRF_token')
  if (!cookie) return false

  return header === cookie
}
