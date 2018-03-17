import babel from 'rollup-plugin-babel';

export default [
  babel({
    exclude: 'node_modules/**'
  })
]
