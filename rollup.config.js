import babel from 'rollup-plugin-babel';

export default {
  input: `index.js`,
  output: [
    { file: 'dist/bind-group.js', name: 'bindGroup', format: 'umd' },
    { file: 'dist/bind-group.es.js', format: 'es' }
  ],
  external: [
    'preact'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
