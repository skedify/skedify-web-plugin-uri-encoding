# Skedify URI-Encoding

**Release:**
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/skedify/skedify-uri-encoding/develop/LICENSE)
[![npm](https://img.shields.io/npm/v/skedify-uri-encoding.svg?maxAge=2592000)](https://www.npmjs.com/package/skedify-uri-encoding)
![Build Status](https://github.com/skedify/pci-dss-sanitizer/actions/workflows/main.yml/badge.svg)

**Development:**
![Build Status](https://github.com/skedify/pci-dss-sanitizer/actions/workflows/main.yml/badge.svg?branch=develop)
[![GitHub issues](https://img.shields.io/github/issues/skedify/skedify-uri-encoding.svg)](https://github.com/skedify/skedify-uri-encoding/issues)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Installation

```bash
npm install skedify-uri-encoding
```

## Usage

With ES Modules:
```javascript
import { encodeURIParameters, decodeURIParameters } from 'skedify-uri-encoding';

const encoded = encodeURIParameters({ attribute: 'value' });
console.log({ encoded });
const decoded = decodeURIParameters(encoded);
console.log({ decoded });
```

With CommonJS:
```javascript
const { encodeURIParameters, decodeURIParameters } = require('skedify-uri-encoding');

const encoded = encodeURIParameters({ attribute: 'value' });
console.log({ encoded });
const decoded = decodeURIParameters(encoded);
console.log({ decoded });
``` 

## Stack

This repostiory uses [TSDX](https://tsdx.io/) for development.

## Contributing

Use `npm run commit` when you want to commit a change.

## Releases

This project uses [GitHub actions](https://docs.github.com/en/actions/reference) 
and [semantic-release](https://github.com/semantic-release/semantic-release) for creating releases.

### Release Candidates

To make a (temporary) release candidate, push a new tag. The version in `package.json` will be the same as the tagname without the `v` prefix.

```bash
git tag v5.0.0-rc.1 && git push origin v5.0.0-rc.1
```

### Final Releases

Since `semantic-release` is currently configured to run on any `push`'es to `master`,
creating and merging a GitHub Pull Request into `master` will trigger a new release automatically.

Typically we do this via a temporary `release/next` or `release/SKED-XXXX` branch and creating a PR via GitHub UI.
