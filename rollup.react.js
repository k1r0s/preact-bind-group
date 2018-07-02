import babel from 'rollup-plugin-babel';
import common from './rollup.common';

export default {
  input: `react.dev.js`,
  output: [
    { file: 'dist/react-form-group.js', name: 'reactFormGroup', format: 'umd' },
    { file: 'dist/react-form-group.es.js', format: 'es' },
    { file: 'react.js', name: 'reactFormGroup', format: 'umd' }
  ],
  external: [
    'react'
  ],
  plugins: common
}
