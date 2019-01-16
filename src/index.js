import stringify from 'json-stable-stringify'

import fromCodePoint from './fromCodePoint'
import codePointAt from './codePointAt'
import repeat from './repeat'

export function encodeURIParameters(params) {
  /* eslint-disable-next-line no-undef */
  const params_string = btoa(stringify(params))
  const idx_of_first_eqs = params_string.indexOf('=')
  const no_of_eqs =
    idx_of_first_eqs < 0 ? 0 : params_string.length - idx_of_first_eqs

  return (
    params_string.substring(0, params_string.length - no_of_eqs) +
    fromCodePoint(codePointAt(params_string, 0) + no_of_eqs)
  )
}

export function decodeURIParameters(encoded) {
  const end = encoded.length - 1

  return JSON.parse(
    /* eslint-disable-next-line no-undef */
    `${atob(
      encoded.substr(0, end) +
        repeat('=', codePointAt(encoded, end) - codePointAt(encoded, 0))
    )}`
  )
}
