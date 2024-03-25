const { meteorlxy } = require('@meteorlxy/eslint-config');

module.exports = meteorlxy({
  ignores: ['lib/', 'proto/'],
  typescript: {
    tsconfigPath: './tsconfig.json',
    overrides: {
      'no-console': 'off',
    },
  },
});
