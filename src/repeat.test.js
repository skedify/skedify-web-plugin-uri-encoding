import repeat from './repeat'

const createStringWithoutRepeat = string => {
  const aString = new String(string)
  aString.repeat = undefined

  return aString
}

const testCases = [
  { string: 'abc', toBe: '' },
  { string: 'abc', count: undefined, toBe: '' },
  { string: 'abc', count: null, toBe: '' },
  { string: 'abc', count: false, toBe: '' },
  { string: 'abc', count: NaN, toBe: '' },
  { string: 'abc', count: 'abc', toBe: '' },
  { string: 'abc', count: -0, toBe: '' },
  { string: 'abc', count: +0, toBe: '' },
  { string: 'abc', count: 1, toBe: 'abc' },
  { string: 'abc', count: 2, toBe: 'abcabc' },
  { string: 'abc', count: 3, toBe: 'abcabcabc' },
  { string: 'abc', count: 4, toBe: 'abcabcabcabc' },
]

describe('repeat (when String.repeat exist)', () => {
  testCases.forEach(testCase => {
    it(`should return ${testCase.toBe} on string ${
      testCase.string
    } with count ${testCase.count}`, () => {
      expect(repeat(testCase.string, testCase.count)).toBe(testCase.toBe)
    })
  })
})

describe('repeat (when String.repeat does not exist)', () => {
  testCases.forEach(testCase => {
    it(`should return ${testCase.toBe} on string ${
      testCase.string
    } with count ${testCase.count}`, () => {
      expect(
        repeat(createStringWithoutRepeat(testCase.string), testCase.count)
      ).toBe(testCase.toBe)
    })
  })

  it('should throw a range error when count is negative', () => {
    expect(() => {
      repeat(createStringWithoutRepeat('abc'), -1)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw a range error when count is negative infinity', () => {
    expect(() => {
      repeat(createStringWithoutRepeat('abc'), -Infinity)
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw a range error when count is infinity', () => {
    expect(() => {
      repeat(createStringWithoutRepeat('abc'), Number(Infinity))
    }).toThrowErrorMatchingSnapshot()
  })

  it('should throw an exception when strings are 1 << 28 chars or longer', () => {
    expect(() => {
      repeat(createStringWithoutRepeat('a'), Math.pow(2, 28))
    }).toThrowErrorMatchingSnapshot()
  })
})
