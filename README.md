# server-csrf-check [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Validate a client-side [CSRF][13] token + cookie on a server.

This package makes use of [stateless CSRF][12] by requiring every request to
have both a cookie + HTTP header set on every request. The server then verifies
they are the same which means they're from the right domain. This works because
a page can only read / write cookies for its own domain and set the header.

It compares the `X-CSRF-token` header value with the `CSRF_token` value in the
cookie. Clients should set these values.

This is a first layer of defence that is vulnerable to XSS, but requires a
relatively low cost to implement. To also prevent prevent XSS based CSRF
consider using per request tokens.

This is also not a replacement for authentication tokens (OAuth or otherwise),
this merely prevents tokens from being exploited by malicious agents.

## Installation
```sh
$ npm install server-csrf-check
```

## Usage
```js
const csrfCheck = require('server-csrf-check')
const http = require('http')

http.createServer(function (req, res) {
  if (!csrfCheck(req, res)) return res.end('CSRF detected')
  res.end('all good')
}).listen()
```

## API
### bool = serverCsrfCheck(req, res)
Check an `IncomingMessage` for the equality of an `X-CSRF-token` header and
`CSRF_token` on a cookie. Returns a boolean.

## See Also
- [owasp/csrf][13]
- [whitehatsec/session-token](https://blog.whitehatsec.com/tag/session-token/)
- [blog.jdriven/stateless-csrf][12]
- [mdn/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/server-csrf-check.svg?style=flat-square
[3]: https://npmjs.org/package/server-csrf-check
[4]: https://img.shields.io/travis/yoshuawuyts/server-csrf-check/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/server-csrf-check
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/server-csrf-check/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/server-csrf-check
[8]: http://img.shields.io/npm/dm/server-csrf-check.svg?style=flat-square
[9]: https://npmjs.org/package/server-csrf-check
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[12]: http://blog.jdriven.com/2014/10/stateless-spring-security-part-1-stateless-csrf-protection/
[13]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29
