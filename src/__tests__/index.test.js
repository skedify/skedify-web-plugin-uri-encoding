import atob from 'atob';
import btoa from 'btoa';

import { encodeURIParameters, decodeURIParameters } from '../index';

if (!window.atob || !window.btoa) {
  window.atob = atob;
  window.btoa = btoa;
}

const exampleObject = {
  aKey: 'aValue',
};

describe('skedify-uri-encoding', () => {

  test('should return correct hash when no object is given', () => {
    expect(encodeURIParameters()).toMatchSnapshot();
  });

  test('should return correct hash when empty object is given', () => {
    expect(encodeURIParameters({})).toMatchSnapshot();
  });

  test('should return correct hash when an object is given', () => {
    expect(encodeURIParameters(exampleObject)).toMatchSnapshot();
  });

  test('should return correct object when string e30f is given', () => {
    expect(decodeURIParameters('e30f')).toMatchSnapshot();
  });

  test('should return correct object when string is given', () => {
    expect(decodeURIParameters('eyJhS2V5IjoiYVZhbHVlIn0f')).toMatchSnapshot();
  });

});
