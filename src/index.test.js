/* eslint-disable no-undef */

import atob from 'atob'
import btoa from 'btoa'

import { encodeURIParameters, decodeURIParameters } from '.'

if (!window.atob || !window.btoa) {
  window.atob = atob
  window.btoa = btoa
}

const exampleObject = {
  aKey: 'aValue',
}

describe('skedify-uri-encoding', () => {
  it('should return correct hash when no object is given', () => {
    expect(encodeURIParameters()).toMatchSnapshot()
  })

  it('should return correct hash when empty object is given', () => {
    expect(encodeURIParameters({})).toMatchSnapshot()
  })

  it('should return correct hash when an object is given', () => {
    expect(encodeURIParameters(exampleObject)).toMatchSnapshot()
  })

  it('should return correct object when string e30f is given', () => {
    expect(decodeURIParameters('e30f')).toMatchSnapshot()
  })

  it('should return correct object when string is given', () => {
    expect(decodeURIParameters('eyJhS2V5IjoiYVZhbHVlIn0f')).toMatchSnapshot()
  })
})
