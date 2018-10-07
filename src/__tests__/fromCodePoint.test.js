import fromCodePoint from '../fromCodePoint'

const testCases = [
  { expect: fromCodePoint(''), toBe: '\0' },
  { expect: fromCodePoint(), toBe: '' },
  { expect: fromCodePoint(-0), toBe: '\0' },
  { expect: fromCodePoint(0), toBe: '\0' },
  { expect: fromCodePoint(0x1d306), toBe: '\uD834\uDF06' },
  {
    expect: fromCodePoint(0x1d306, 0x61, 0x1d307),
    toBe: '\uD834\uDF06a\uD834\uDF07',
  },
  { expect: fromCodePoint(0x61, 0x62, 0x1d307), toBe: 'ab\uD834\uDF07' },
  { expect: fromCodePoint(false), toBe: '\0' },
  { expect: fromCodePoint(null), toBe: '\0' },
]

const testCasesThrowsError = [
  { value: '_' },
  { value: '+Infinity' },
  { value: '-Infinity' },
  { value: -1 },
  { value: 0x10ffff + 1 },
  { value: 3.14 },
  { value: 3e-2 },
  { value: -Infinity },
  { value: Number(Infinity) },
  { value: NaN },
  { value: undefined },
  { value: {} },
  { value: /./ },
]

describe('fromCodePoint', () => {
  testCases.forEach(testCase => {
    test(`expect ${testCase.expect} toBe ${testCase.toBe}`, () => {
      expect(testCase.expect).toBe(testCase.toBe)
    })
  })

  testCasesThrowsError.forEach(testCase => {
    test(`expect ${testCase.value} to throw a RangeError`, () => {
      /* eslint-disable-next-line max-nested-callbacks */
      expect(() => fromCodePoint(testCase.value)).toThrowErrorMatchingSnapshot()
    })
  })
})
