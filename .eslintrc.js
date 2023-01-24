module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'react'
  ],
  rules: {
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { before: true, after: true }
    ],
    'no-console': 0
  }
}
