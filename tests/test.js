const test = require('tape')
const isGoogle = require('../')

test('should fail on wrong IPs', (t) => {
  t.plan(2)
  isGoogle('1.1.1.1').then(outcome => t.notOk(outcome))
  isGoogle('123.123.123.123').catch(err => t.equal(err.code, 'ENOTFOUND'))
})

test('should fail with wrong inputs', (t) => {
  t.plan(3)
  isGoogle('helloworld').catch(err => t.ok(err))
  isGoogle('0.0.0.0.0.0').catch(err => t.ok(err))
  isGoogle().catch(err => t.ok(err))
})

test('should pass on valid googlebot.com crawler ip', (t) => {
  t.plan(1)
  isGoogle('66.249.66.1').then(outcome => t.ok(outcome))
})

test('should pass on valid google.com crawler ip', (t) => {
  t.plan(1)
  isGoogle('66.249.90.77').then(outcome => t.ok(outcome))
})
