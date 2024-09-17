const process = require('node:process')

module.exports = {
  extends: '@antfu',
  rules: {
    // 禁用语句分号
    'semi': [2, 'never'],
    // 使用单引号
    'quotes': ['error', 'single'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // eslint 报process的错误
    'n/prefer-global/process': 0,
  },
}
