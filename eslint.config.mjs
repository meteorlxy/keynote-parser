import { meteorlxy } from '@meteorlxy/eslint-config';

export default meteorlxy({
  ignores: {
    files: ['proto/'],
  },
  typescript: {
    overrides: {
      'no-console': 'off',
    },
  },
});
