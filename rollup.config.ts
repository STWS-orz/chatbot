import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import bable from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const ignoreErrors = ['CIRCULAR_DEPENDENCY', 'THIS_IS_UNDEFINED', 'UNUSED_EXTERNAL_IMPORT'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'roobot',
      sourcemap: true,
    },
  ],
  plugins: [
    bable({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'bundled',
      include: ['src/**/*'],
    }),
    commonjs(),
    json(),
    resolve({ extensions })
  ],
};
