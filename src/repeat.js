export default function repeat(string, count) {
  if (string.repeat && typeof string.repeat === 'function') {
    return string.repeat(count);
  }

  let counter = Number(count);
  let newString = string;

  if (isNaN(counter)) {
    counter = 0;
  }

  if (counter < 0) {
    throw new RangeError('repeat count must be non-negative');
  }

  if (counter === Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }

  counter = Math.floor(counter);

  if (newString.length === 0 || counter === 0) {
    return '';
  }

  // Ensuring count is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (August 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  if (newString.length * counter >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }

  let rpt = '';

  /* eslint-disable-next-line no-constant-condition */
  while (true) {
    /* eslint-disable-next-line no-bitwise */
    if ((counter & 1) === 1) {
      rpt += newString;
    }

    /* eslint-disable-next-line no-bitwise */
    counter >>>= 1;

    if (counter === 0) {
      break;
    }

    newString += newString;
  }

  return rpt;
}
