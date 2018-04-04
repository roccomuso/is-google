# is-google

[![NPM Version](https://img.shields.io/npm/v/is-google.svg)](https://www.npmjs.com/package/is-google)
[![Build Status](https://travis-ci.org/roccomuso/is-google.svg?branch=master)](https://travis-ci.org/roccomuso/is-google)
![node](https://img.shields.io/node/v/is-google.svg)
[![Dependency Status](https://david-dm.org/roccomuso/is-google.png)](https://david-dm.org/roccomuso/is-google)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Verify that a request is from Google crawlers using Google's DNS verification steps

You may wish to verify that a web crawler accessing your server is Googlebot (or another Google user-agent) and not spammers or other bots scraping your site while claiming to be Googlebot. Since you cannot rely on the `User-Agent` header which is easily spoofed, you need to use DNS look up to verify that the IP address belongs to Google.

This library implements Google's own verification steps [outlined here](https://support.google.com/webmasters/answer/80553?hl=en).

## Install

`npm install --save is-google`

## Example

```javascript
const isGoogle = require('is-google')

let ip = '66.249.66.1'
isGoogle(ip).then((outcome) => {
  if (outcome) {
    // it's google.
  }
}).catch(console.error)
```

### Example with express

```javascript
app.enable('trust proxy')

app.use((req, res, next) => {
  let ip = req.ip || req.connection.remoteAddress
  isGoogle(ip).then(outcome => {
    if (outcome) {
      res.status(404).text('Nothing to scan') // block google crawler
    } else {
      next() // it's a user
    }
  })
})
```

## Tests

`npm test`

## License

MIT

## Author

Rocco Musolino [@roccomuso](https://twitter.com/roccomuso)
