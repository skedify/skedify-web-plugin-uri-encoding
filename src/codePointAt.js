export default function codePointAt(string, position) {
  /* eslint-disable-next-line better/no-typeofs */
  if (string.codePointAt && typeof string.codePointAt === 'function') {
    return string.codePointAt(position)
  }

  /*! http://mths.be/codepointat v0.1.0 by @mathias */
  const size = string.length
  // `ToInteger`
  let index = position ? Number(position) : 0

  if (isNaN(index)) {
    index = 0
  }

  // Account for out-of-bounds indices:
  if (index < 0 || index >= size) {
    return undefined
  }

  // Get the first code unit
  const first = string.charCodeAt(index)
  let second

  if (
    // check if it’s the start of a surrogate pair
    first >= 0xd800 &&
    first <= 0xdbff && // high surrogate
    size > index + 1 // there is a next code unit
  ) {
    second = string.charCodeAt(index + 1)

    if (second >= 0xdc00 && second <= 0xdfff) {
      // low surrogate
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000
    }
  }

  return first
}
