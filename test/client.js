const Client = require('../lib/client.js')
const t = require('tap')

t.test('basic', t => {
  const c = new Client()
  t.equal(c.stopOnDone, false, 'stopOnDone false by default')
  t.equal(c.normalize, false, 'normalize false by default')
  t.equal(c.size, 0, 'size is 0')
  t.equal(c.listening, false, 'not listening')
  c.stop()
  t.equal(c.listening, false, 'still not listening')
  c.start()
  t.equal(c.listening, true, 'now listening')
  c.start()
  t.equal(c.listening, true, 'still listening')

  c.stop()
  c.once('progress', (key, data) => {})
  t.equal(c.listening, true, 'listening because once handler added')
  c.emit('progress')
  t.equal(c.listening, false, 'not listening because once handler removed')

  c.addListener('progress', (key, data) => t.matchSnapshot([key, data], 'progress data'))
  t.equal(c.listening, true, 'listening, because progress event handler added')

  let sawProgress = false
  c.once('progress', (key, data) => {
    sawProgress = true
  })

  let sawBarDone = false
  c.once('barDone', (key, data) => {
    sawBarDone = true
    t.matchSnapshot([key, data], 'barDone data')
  })

  let sawBar = false
  c.once('bar', (key, data) => {
    sawBar = true
    t.matchSnapshot([key, data], 'bar data')
  })

  process.emit('progress', 'key', { hello: 'world', value: 1, total: 99 })
  t.equal(c.size, 1, '1 progress bar now')
  t.equal(sawBar, true, 'saw bar event')
  t.equal(sawProgress, true, 'saw progress event')

  process.emit('progress', 'yek', { hello: 'world', value: 5, total: 50 })
  t.equal(c.size, 2, 'got a second bar')

  process.emit('progress', 'key', { hello: 'world', value: 100, total: 50 })
  t.equal(c.size, 1, 'first progress bar ended')
  t.equal(sawBarDone, true, 'saw barDone event')

  process.emit('progress', 'yek', { hello: 'world', value: 100, total: 50 })
  t.equal(c.size, 0, 'second progress bar ended, all done')

  process.emit('progress', 'foo', { hello: 'world', value: 100, total: 50 })
  t.equal(c.size, 0, 'progress bar ended right away')

  c.off('progress', c.listeners('progress')[0])
  t.equal(c.listening, false, 'stopped because last listener removed')

  t.end()
})

t.test('stop on done', t => {
  const c = new Client({ stopOnDone: true })
  c.on('progress', (key, data) => t.matchSnapshot([key, data], 'progress data'))
  process.emit('progress', 'key', { hello: 'world', value: 1, total: 99 })
  process.emit('progress', 'key', { hello: 'world', value: 100, total: 100 })
  t.equal(c.listening, false, 'not listening, because last bar done')
  t.end()
})

t.test('normalize data', t => {
  const c = new Client({ normalize: true })
  c.on('progress', (key, data) => t.matchSnapshot([key, data], 'progress data'))
  c.on('barDone', () => t.end())
  process.emit('progress', 'key', { value: 1, total: 5 })
  process.emit('progress', 'key', { value: 2, total: 12 })
  process.emit('progress', 'key', { value: 3, total: 12 })
  process.emit('progress', 'key', { value: 4, total: 13 })
  process.emit('progress', 'key', { value: 6, total: 13 })
  process.emit('progress', 'key', { value: 3, total: 6 })
  process.emit('progress', 'key', { value: 5, total: 6 })
  process.emit('progress', 'key', { value: 45, total: 50 })
  process.emit('progress', 'key', { value: 45, total: 50 })
  process.emit('progress', 'key', { value: 45, total: 50 })
  process.emit('progress', 'key', { value: 45, total: 50 })
  process.emit('progress', 'key', { value: 9001, total: 420 })
  c.stop()
})
