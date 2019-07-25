module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:vue/base'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 8
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-tabs': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  }
}
