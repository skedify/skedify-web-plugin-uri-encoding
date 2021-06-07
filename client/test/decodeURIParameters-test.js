/* eslint-disable better/no-fors */

const path = require('path')
const assert = require('assert')
const examples = require('./utils/examples.js')

const { decodeURIParameters } = require(path.resolve('.'))

test(`should encode correctly for main examples`, () => {
  for (const example of examples.main) {
    const { decoded, encoded } = example
    assert.deepStrictEqual(decodeURIParameters(encoded), decoded)
  }
})

// The fact that these values throw an error is
// especially important for backwards-compatibility
const throwing_examples = [
  {
    name: 'undefined',
    value: undefined,
  },
  {
    name: 'invalid_string',
    value: 'invalid',
  },
  {
    name: 'non_decoded_json',
    value: '{}',
  },
]

test(`should throw/reject on invalid values`, () => {
  for (const example of throwing_examples) {
    const { value, name } = example

    let result
    try {
      result = decodeURIParameters(value)
    } catch (err) {
      result = err
    }

    if (!(result instanceof Error)) {
      throw new Error(`should have thrown an error for: '${name}'`)
    }
  }
})
