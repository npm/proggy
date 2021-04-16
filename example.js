const chalk = require('chalk')
const proggy = require('./')

// set up our display thing
const cliProgress = require('cli-progress')
const multibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true,
  // note that data.actualValue and data.actualTotal will reflect the real
  // done/remaining values.  data.value will always be less than 100, and
  // data.total will always be 100, so we never show reverse motion.
  format: '[' + chalk.cyan('{bar}') + '] {percentage}% | {name} {actualValue}/{actualTotal} | {duration_formatted} ETA: {eta_formatted}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
}, cliProgress.Presets.shades_grey)




// update it with events from the proggy client
const client = proggy.createClient({
  // don't show reverse progress
  // this is false by default
  normalize: true,
})
const bars = {}
// new bar is created, tell multibar about it
client.on('bar', (key, data) => {
  bars[key] = multibar.create(data.total)
})
// got some progress for a progress bar, tell multibar to show it
client.on('progress', (key, data) => {
  bars[key].update(data.value, data)
  bars[key].setTotal(data.total)
})
// a bar is done, tell multibar to stop updating it
client.on('barDone', (key, data) => {
  bars[key].stop()
})
// all bars done, tell multibar to close entirely
client.on('done', () => {
  multibar.stop()
})



// the thing that emits the events
let b1value = 0
let b1total = 100
let b2value = 0
let b2total = 2000
let b3value = 0
let b3total = 500

const b1 = proggy.createTracker('bar 1')
const b2 = proggy.createTracker('bar 2')
const b3 = proggy.createTracker('bar 3')

const interval = setInterval(() => {
  const inc = Math.ceil(Math.random() * 10)
  if (b3value < b3total) {
    b3value = Math.ceil(b3value + 0.003 * (b3total + b3value))
    b3.update(Math.min(b3value, b3total), b3total)
  }
  if (2.9 * Math.random() < 1 && b1value < b1total && b1total < 2000)
    b1total += inc*3
  if (b1value < b1total)
    b1.update(Math.min(b1total, b1value += inc), b1total)
  if (b2value < b2total)
    b2.update(Math.min(b2total, b2value += inc), b2total)

  if (b1value >= b1total && b2value>=b2total && b3value>=b3total)
    clearInterval(interval)
}, 50)
