/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/tracker.js TAP ctor > name and key 1`] = `
Tracker {
  "_events": Null Object {},
  "_eventsCount": 0,
  "_maxListeners": undefined,
  "done": false,
  "key": "hellokey",
  "name": "hello",
  "total": 100,
  "value": 0,
}
`

exports[`test/tracker.js TAP ctor > name and total 1`] = `
Tracker {
  "_events": Null Object {},
  "_eventsCount": 0,
  "_maxListeners": undefined,
  "done": false,
  "key": "hello",
  "name": "hello",
  "total": 5,
  "value": 0,
}
`

exports[`test/tracker.js TAP ctor > name, key, and total 1`] = `
Tracker {
  "_events": Null Object {},
  "_eventsCount": 0,
  "_maxListeners": undefined,
  "done": false,
  "key": "hellokey",
  "name": "hello",
  "total": 5,
  "value": 0,
}
`

exports[`test/tracker.js TAP ctor > name, no key or total 1`] = `
Tracker {
  "_events": Null Object {},
  "_eventsCount": 0,
  "_maxListeners": undefined,
  "done": false,
  "key": "hello",
  "name": "hello",
  "total": 100,
  "value": 0,
}
`

exports[`test/tracker.js TAP emit some events > progress event 1`] = `
Array [
  "key",
  Object {
    "done": false,
    "key": "key",
    "name": "hello",
    "total": 10,
    "value": 2,
  },
]
`

exports[`test/tracker.js TAP emit some events > progress event 2`] = `
Array [
  "key",
  Object {
    "done": false,
    "key": "key",
    "message": "reduced total",
    "name": "hello",
    "total": 5,
    "value": 2,
  },
]
`

exports[`test/tracker.js TAP emit some events > progress event 3`] = `
Array [
  "key",
  Object {
    "done": false,
    "key": "key",
    "message": "no change to total",
    "name": "hello",
    "total": 5,
    "value": 3,
  },
]
`

exports[`test/tracker.js TAP emit some events > progress event 4`] = `
Array [
  "key",
  Object {
    "done": false,
    "key": "key",
    "message": "increased total",
    "name": "hello",
    "total": 100,
    "value": 7,
  },
]
`

exports[`test/tracker.js TAP emit some events > progress event 5`] = `
Array [
  "key",
  Object {
    "done": false,
    "key": "key",
    "message": "reduced value",
    "name": "hello",
    "total": 200,
    "value": 4,
  },
]
`

exports[`test/tracker.js TAP emit some events > progress event 6`] = `
Array [
  "key",
  Object {
    "done": true,
    "key": "key",
    "message": "implicitly done",
    "name": "hello",
    "total": 100,
    "value": 100,
  },
]
`

exports[`test/tracker.js TAP finish() alias for update(total, total) run with data > data received by done event 1`] = `
undefined
`

exports[`test/tracker.js TAP finish() alias for update(total, total) run without > data received by done event 1`] = `
undefined
`
