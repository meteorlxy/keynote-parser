const { meteorlxy } = require('@meteorlxy/eslint-config');

module.exports = meteorlxy({
  ignores: {
    files: ['proto/'],
  },
  typescript: {
    overrides: {
      'no-console': 'off',
    },
  },
});
