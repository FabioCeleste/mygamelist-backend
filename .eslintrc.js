module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 0,
    'import/newline-after-import': 0,
    'import/first': 0,
    'no-param-reassign': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'no-loop-func': 0,
    'no-await-in-loop': 0,
    'max-len': 0,
    camelcase: 0,
    eqeqeq: 0,
    radix: 0,
  },
};
