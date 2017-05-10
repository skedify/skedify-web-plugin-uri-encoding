import repeat from '../repeat';

describe('repeat (when String.repeat exist)', () => {

  test('should return aWord five times', () => {
    expect(repeat('aWord', 5)).toMatchSnapshot();
  });

  test('should return empty string when empty string given', () => {
    expect(repeat('', 5)).toMatchSnapshot();
  });

  test('should return empty string when count is null', () => {
    expect(repeat('aWord', 0)).toMatchSnapshot();
  });

});

const aString = new String('aWord');
const aEmptyString = new String('');

aString.repeat = undefined;
aEmptyString.repeat = undefined;

describe('repeat (when String.repeat does not exist)', () => {

  test('should return aWord five times', () => {
    expect(repeat(aString, 5)).toMatchSnapshot();
  });

  test('should return empty string when empty string given', () => {
    expect(repeat(aEmptyString, 5)).toMatchSnapshot();
  });

  test('should return empty string when count is null', () => {
    expect(repeat(aString, 0)).toMatchSnapshot();
  });

  test('should throw error when count is negative', () => {
    expect(() => repeat(aString, -2)).toThrowErrorMatchingSnapshot();
  });

  test('should throw error when count is Infinity', () => {
    expect(() => repeat(aString, Infinity)).toThrowErrorMatchingSnapshot();
  });
});
