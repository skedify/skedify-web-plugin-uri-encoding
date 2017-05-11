import codePointAt from '../codePointAt';

const testCases = [
  // String that starts with a BMP symbol
  { value: 'abc\uD834\uDF06def', at: '', toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: '_', toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: -Infinity, toBe: undefined },
  { value: 'abc\uD834\uDF06def', at: -1, toBe: undefined },
  { value: 'abc\uD834\uDF06def', at: -0, toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: 0, toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: 3, toBe: 0x1d306 },
  { value: 'abc\uD834\uDF06def', at: 4, toBe: 0xdf06 },
  { value: 'abc\uD834\uDF06def', at: 5, toBe: 0x64 },
  { value: 'abc\uD834\uDF06def', at: 42, toBe: undefined },
  { value: 'abc\uD834\uDF06def', at: Infinity, toBe: undefined },
  { value: 'abc\uD834\uDF06def', at: Infinity, toBe: undefined },
  { value: 'abc\uD834\uDF06def', at: NaN, toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: false, toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: null, toBe: 0x61 },
  { value: 'abc\uD834\uDF06def', at: undefined, toBe: 0x61 },

  // String that starts with an astral symbol
  { value: '\uD834\uDF06def', at: '', toBe: 0x1d306 },
  { value: '\uD834\uDF06def', at: '1', toBe: 0xdf06 },
  { value: '\uD834\uDF06def', at: '_', toBe: 0x1d306 },
  { value: '\uD834\uDF06def', at: -1, toBe: undefined },
  { value: '\uD834\uDF06def', at: -0, toBe: 0x1d306 },
  { value: '\uD834\uDF06def', at: 0, toBe: 0x1d306 },
  { value: '\uD834\uDF06def', at: 1, toBe: 0xdf06 },
  { value: '\uD834\uDF06def', at: 42, toBe: undefined },
  { value: '\uD834\uDF06def', at: false, toBe: 0x1d306 },
  { value: '\uD834\uDF06def', at: null, toBe: 0x1d306 },
  { value: '\uD834\uDF06def', at: undefined, toBe: 0x1d306 },

  // Lone high surrogates
  { value: '\uD834abc', at: '', toBe: 0xd834 },
  { value: '\uD834abc', at: '_', toBe: 0xd834 },
  { value: '\uD834abc', at: -1, toBe: undefined },
  { value: '\uD834abc', at: -0, toBe: 0xd834 },
  { value: '\uD834abc', at: 0, toBe: 0xd834 },
  { value: '\uD834abc', at: false, toBe: 0xd834 },
  { value: '\uD834abc', at: NaN, toBe: 0xd834 },
  { value: '\uD834abc', at: null, toBe: 0xd834 },
  { value: '\uD834abc', at: undefined, toBe: 0xd834 },

  // Lone low surrogates
  { value: '\uDF06abc', at: '', toBe: 0xdf06 },
  { value: '\uDF06abc', at: '_', toBe: 0xdf06 },
  { value: '\uDF06abc', at: -1, toBe: undefined },
  { value: '\uDF06abc', at: -0, toBe: 0xdf06 },
  { value: '\uDF06abc', at: 0, toBe: 0xdf06 },
  { value: '\uDF06abc', at: false, toBe: 0xdf06 },
  { value: '\uDF06abc', at: NaN, toBe: 0xdf06 },
  { value: '\uDF06abc', at: null, toBe: 0xdf06 },
];

describe('codePointAt (when String.codePointAt exist)', () => {
  testCases.forEach(testCase => {
    test(`codePointAt ${testCase.at} of ${testCase.value} should be ${testCase.toBe}`, () => {
      expect(codePointAt(testCase.value, testCase.at)).toBe(testCase.toBe);
    });
  });
});

describe('codePointAt (when String.codePointAt does not exist)', () => {
  testCases.forEach(testCase => {
    test(`codePointAt ${testCase.at} of ${testCase.value} should be ${testCase.toBe}`, () => {
      const aString = new String(testCase.value);

      aString.codePointAt = undefined;

      expect(codePointAt(aString, testCase.at)).toBe(testCase.toBe);
    });
  });
});
