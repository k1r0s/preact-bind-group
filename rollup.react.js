import babel from 'rollup-plugin-babel';
import common from './rollup.common';

export default {
  input: `react.dev.js`,
  output: [
    { file: 'dist/react-bind-group.js', name: 'reactBindGroup', format: 'umd' },
    { file: 'dist/react-bind-group.es.js', format: 'es' },
    { file: 'react.js', format: 'es' }
  ],
  external: [
    'react'
  ],
  plugins: common
}
