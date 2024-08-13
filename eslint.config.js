const { meteorlxy } = require('@meteorlxy/eslint-config');

module.exports = meteorlxy({
  ignores: ['lib/', 'proto/'],
  typescript: {
    overrides: {
      'no-console': 'off',
    },
  },
});
