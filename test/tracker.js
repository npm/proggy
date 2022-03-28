const Tracker = require('../lib/tracker.js')
const t = require('tap')

t.test('ctor', t => {
  t.throws(() => new Tracker(), {
    message: 'proggy: Tracker needs a name',
  })
  t.matchSnapshot(new Tracker('hello'), 'name, no key or total')
  t.matchSnapshot(new Tracker('hello', 5), 'name and total')
  t.matchSnapshot(new Tracker('hello', 'hellokey'), 'name and key')
  t.matchSnapshot(new Tracker('hello', 'hellokey', 5), 'name, key, and total')
  t.end()
})

t.test('emit some events', t => {
  const listener = (key, data) =>
    t.matchSnapshot([key, data], 'progress event')

  t.teardown(() => process.removeListener('progress', listener))
  process.on('progress', listener)

  const tracker = new Tracker('hello', 'key', 10)
  // 6 updates, 1 throw for update after done
  t.plan(7)
  tracker.on('done', () => {
    t.throws(() => tracker.update(1, 2), {
      message: 'proggy: updating completed tracker: "key"',
    })
    t.end()
  })
  tracker.update(2)
  tracker.update(2, 5, { message: 'reduced total' })
  tracker.update(3, { message: 'no change to total' })
  tracker.update(7, 100, { message: 'increased total' })
  tracker.update(4, 200, { message: 'reduced value' })
  tracker.update(100, 100, { message: 'implicitly done' })
})

t.test('finish() alias for update(total, total)', t => {
  const runTest = data => t => {
    const tracker = new Tracker('hello', 'key', 10)
    tracker.on('done', doneData => {
      t.matchSnapshot(doneData, 'data received by done event')
      t.end()
    })
    tracker.finish(data)
  }
  t.test('run with data', runTest({ hello: 'world' }))
  t.test('run without', runTest())
  t.end()
})
