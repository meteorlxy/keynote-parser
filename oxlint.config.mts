import { meteorlxy } from '@meteorlxy/oxlint-config';

export default meteorlxy({
  ignorePatterns: ['bin/', 'proto/'],
  options: {
    typeCheck: true,
    typeAware: true,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
});
