import babel from 'rollup-plugin-babel';

export default {
  input: `index.js`,
  output: [
		{ file: 'bind-group.js', name: 'bindGroup', format: 'umd' },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      "presets": [
        [
          "env",
          {
            "modules": false
          }
        ]
      ],
      "plugins": [
        "transform-es2015-computed-properties",
        "transform-object-rest-spread"
      ]
    })
  ]
}
