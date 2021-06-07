/* eslint-disable better/no-fors */

const path = require('path')
const assert = require('assert')
const examples = require('./utils/examples.js')

const { encodeURIParameters } = require(path.resolve('.'))

test(`should encode correctly for main examples`, () => {
  for (const example of examples.main) {
    const { decoded, encoded } = example
    assert.strictEqual(encodeURIParameters(decoded), encoded)
  }
})
