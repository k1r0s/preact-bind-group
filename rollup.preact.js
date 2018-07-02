import babel from 'rollup-plugin-babel';
import common from './rollup.common';

export default {
  input: `preact.dev.js`,
  output: [
    { file: 'dist/preact-bind-group.js', name: 'preactFormGroup', format: 'umd' },
    { file: 'dist/preact-bind-group.es.js', format: 'es' },
    { file: 'preact.js', name: 'preactFormGroup', format: 'umd' }
  ],
  external: [
    'preact'
  ],
  plugins: common
}
