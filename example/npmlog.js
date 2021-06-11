const chalk = require('chalk')
const proggy = require('../')

// set up our display thing
const npmlog = require('npmlog')
npmlog.enableProgress()
const group = npmlog.newGroup('npmlog example')


// update it with events from the proggy client
const client = proggy.createClient({
  // don't show reverse progress
  // this is false by default
  normalize: true,
})

const bars = {}

// new bar is created, tell npmlog about it
client.on('bar', (key, data) => {
  bars[key] = group.newItem(key, data.total)
  group.notice('starting progress bar', key, data)
})

// got some progress for a progress bar, tell npmlog to show it
client.on('progress', (key, data) => {
  const bar = bars[key]
  group.verbose(key, data.actualValue, data.actualTotal, `${Math.floor(data.value)}%`)
  bar.addWork(bar.workTodo - data.total)
  bars[key].completeWork(data.value - bar.workDone)
})

// a bar is done, tell npmlog to stop updating it
client.on('barDone', (key, data) => {
  group.notice('task completed', key, data)
  bars[key].finish()
})

// all bars done, tell npmlog to close entirely
client.on('done', () => {
  group.notice('all progress completed')
  npmlog.disableProgress()
})


// the thing that emits the events
let b1value = 0
let b1total = 100
let b2value = 0
let b2total = 200
let b3value = 0
let b3total = 50

const b1 = proggy.createTracker('bar 1')
const b2 = proggy.createTracker('bar 2')
const b3 = proggy.createTracker('bar 3')

let i = 0
const interval = setInterval(() => {
  const inc = Math.ceil(Math.random() * 10)

  if (b1value < b1total) {
    if ((i++%2 === 0) && b1total < 2000)
      b1total += inc*3
    else
      b1value += inc
    b1.update(Math.min(b1total, b1value), b1total)
  }

  if (b2value < b2total)
    b2.update(Math.min(b2total, b2value += inc), b2total)

  if (b3value < b3total) {
    b3value = Math.ceil(b3value + 0.003 * (b3total + b3value))
    b3.update(Math.min(b3value, b3total), b3total)
  }

  if (b1value >= b1total && b2value>=b2total && b3value>=b3total)
    clearInterval(interval)
}, 50)
