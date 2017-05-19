export default function repeat(string, count) {
  if (string.repeat && typeof string.repeat === 'function') {
    return string.repeat(count);
  }
  count = +count;
  if (count !== count) {
    count = 0;
  }
  if (count < 0) {
    throw new RangeError('repeat count must be non-negative');
  }
  if (count === Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }
  count = Math.floor(count);
  if (string.length === 0 || count === 0) {
    return '';
  }
  // Ensuring count is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (August 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  if (string.length * count >= 1 << 28) {
    throw new RangeError(
      'repeat count must not overflow maximum string size',
    );
  }
  let rpt = '';
  while (true) {
    if ((count & 1) === 1) {
      rpt += string;
    }
    count >>>= 1;
    if (count === 0) {
      break;
    }
    string += string;
  }
  return rpt;
}
