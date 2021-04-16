const t = require('tap')
const proggy = require('../lib/index.js')
const Client = require('../lib/client.js')
const Tracker = require('../lib/tracker.js')
t.equal(proggy.Client, Client, 'Client class is exported')
t.equal(proggy.Tracker, Tracker, 'Tracker class is exported')

const client = proggy.createClient()
t.type(client, Client, 'createClient returns a client')

t.test('createTracker', t => {
  const tracker = proggy.createTracker('hello')
  t.throws(() => proggy.createTracker('hello'), {
    message: 'proggy: duplicate progress id "hello"',
  })
  tracker.emit('done')
  t.doesNotThrow(() => proggy.createTracker('hello'))
  t.end()
})
