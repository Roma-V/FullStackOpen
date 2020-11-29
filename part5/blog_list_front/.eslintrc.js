module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'jest': true,
  },
  'plugins': [
    'react'
  ],
  'extends': 'plugin:react/recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
  }
}