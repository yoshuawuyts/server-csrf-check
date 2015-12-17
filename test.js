const getPort = require('get-server-port')
const http = require('http')
const test = require('tape')

const csrfCheck = require('./')

test('should assert input types', function (t) {
  t.plan(2)
  t.throws(csrfCheck.bind(null), /is req/)
  t.throws(csrfCheck.bind(null, new http.IncomingMessage()), /is res/)
})

test('should validate a cookie header pair', function (t) {
  t.plan(1)
  const server = http.createServer(function (req, res) {
    t.ok(csrfCheck(req, res), 'csrf pair is valid')
    res.end()
    server.close()
  })
  server.listen()

  const keyString = 'my-super-random-string'
  http.get({
    port: getPort(server),
    headers: {
      'X-CSRF-token': keyString,
      'Cookie': 'CSRF_token=' + keyString
    }
  })
})
test('should validate an invalid cookie header pair', function (t) {
  t.plan(1)
  const server = http.createServer(function (req, res) {
    t.notOk(csrfCheck(req, res), 'csrf pair is invalid')
    res.end()
    server.close()
  })
  server.listen()

  http.get({
    port: getPort(server),
    headers: {
      'X-CSRF-token': 'my-super-random-string',
      'Cookie': 'CSRF_token=my-malicious-string'
    }
  })
})
