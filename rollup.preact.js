import babel from 'rollup-plugin-babel';
import common from './rollup.common';

export default {
  input: `preact.dev.js`,
  output: [
    { file: 'dist/preact-bind-group.js', name: 'preactBindGroup', format: 'umd' },
    { file: 'dist/preact-bind-group.es.js', format: 'es' },
    { file: 'preact.js', format: 'es' }
  ],
  external: [
    'preact'
  ],
  plugins: common
}
