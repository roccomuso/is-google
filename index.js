const dns = require('dns')

function isGoogle (ip) {
  return new Promise((resolve, reject) => {
    dns.reverse(ip, (err, domains) => {
      if (err) {
        return reject(err)
      }
      const hostname = domains[0]
      if (!(hostname.endsWith('.google.com') || hostname.endsWith('.googlebot.com'))) {
        return resolve(false)
      }

      dns.lookup(domains[0], (err, addr) => {
        if (err) {
          return reject(err)
        }
        const outcome = addr === ip
        return resolve(outcome)
      })
    })
  })
}

module.exports = isGoogle
