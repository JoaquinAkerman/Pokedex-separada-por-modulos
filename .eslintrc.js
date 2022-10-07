module.exports = {
  env: { browser: true, es2021: true, jest: true },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'import/extensions': 'off',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
  },
};
