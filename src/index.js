(function(superGlobal) {
  superGlobal.Skedify = (function(global) {

    var floor = Math.floor;

    function repeat(string, count) {
      if (string.repeat && typeof string.repeat === 'function') {
        return string.repeat(count);
      } else {
        count = +count;
        if (count != count) {
          count = 0;
        }
        if (count < 0) {
          throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
          throw new RangeError('repeat count must be less than infinity');
        }
        count = floor(count);
        if (string.length == 0 || count == 0) {
          return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (string.length * count >= 1 << 28) {
          throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (;;) {
          if ((count & 1) == 1) {
            rpt += string;
          }
          count >>>= 1;
          if (count == 0) {
            break;
          }
          string += string;
        }
        return rpt;
      }
    }

    function codePointAt(string, position) {
      if (string.codePointAt && typeof string.codePointAt === 'function') {
        return string.codePointAt(position);
      } else {
        /*! http://mths.be/codepointat v0.1.0 by @mathias */
        var size = string.length;
        // `ToInteger`
        var index = position ? Number(position) : 0;
        if (index != index) { // better `isNaN`
          index = 0;
        }
        // Account for out-of-bounds indices:
        if (index < 0 || index >= size) {
          return undefined;
        }
        // Get the first code unit
        var first = string.charCodeAt(index);
        var second;
        if ( // check if it’s the start of a surrogate pair
          first >= 0xD800 && first <= 0xDBFF && // high surrogate
          size > index + 1 // there is a next code unit
        ) {
          second = string.charCodeAt(index + 1);
          if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
          }
        }
        return first;
      }
    }

    var stringFromCharCode = String.fromCharCode;

    function fromCodePoint() {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
        return '';
      }
      var result = '';
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
          codePoint < 0 || // not a valid Unicode code point
          codePoint > 0x10FFFF || // not a valid Unicode code point
          floor(codePoint) != codePoint // not an integer
        ) {
          throw RangeError('Invalid code point: ' + codePoint);
        }
        if (codePoint <= 0xFFFF) { // BMP code point
          codeUnits.push(codePoint);
        } else { // Astral code point; split in surrogate halves
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = (codePoint % 0x400) + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    }

    global.encodeURIParameters = function encodeURIParameters(params) {
      var params_string = btoa(JSON.stringify(params));
      var idx_of_first_eqs = params_string.indexOf('=');
      var no_of_eqs = idx_of_first_eqs < 0 ? 0 : params_string.length - idx_of_first_eqs;
      return params_string.substring(0, params_string.length - no_of_eqs) + fromCodePoint(codePointAt(params_string, 0) + no_of_eqs);
    };

    global.decodeURIParameters = function decodeURIParameters(encoded) {
      var end = encoded.length - 1;
      return JSON.parse('' + atob(encoded.substr(0, end) + repeat('=', codePointAt(encoded, end) - codePointAt(encoded, 0))));
    };

    return global;
  })(superGlobal.Skedify || {});

  return;
})(typeof self === 'undefined' ? typeof global === 'undefined' ? this : global : self);
