import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';

import fs from 'fs';

const PACKAGE = require('./package.json');

const SOURCE_MAPS = process.env.NODE_ENV !== 'production';

const plugins = [
  eslint({
    exclude: ['node_modules/**', 'package.json'],
  }),
  resolve({
    jsnext: true,
    extensions: ['.js', '.json'],
  }),
  commonjs(),
  babel(((babelrc) => {
    return Object.assign(babelrc, {
      babelrc: false,
      plugins: babelrc.plugins.filter(p => p !== 'transform-es2015-modules-commonjs'),
    });
  })(JSON.parse(fs.readFileSync('./.babelrc', 'utf8')))),
];

export default {
  entry: 'src/index.js',
  targets: [
    {
      format: 'umd',
      moduleName: 'Skedify',
      dest: PACKAGE.main
    },
    {
      format: 'es',
      moduleName: 'Skedify',
      dest: PACKAGE.module
    }
  ],
  exports: 'named',
  sourceMap: SOURCE_MAPS,
  banner: [
    '/**',
    ` * ${PACKAGE.name}`,
    ` * @version ${PACKAGE.version}`,
    ` * @author ${PACKAGE.author.name}`,
    ` * @license ${PACKAGE.license}`,
    ' */',
  ].join('\n'),
  plugins,
};
