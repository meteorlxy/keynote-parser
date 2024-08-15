import { describe, expect, it } from 'vitest';
import { isIwaFile } from '../../src';

const TEST_CASES: [string, boolean][] = [
  ['Index/foo.iwa', true],
  ['Index/foo.jpg', false],
  ['Metadata/foo.iwa', false],
];

describe('isIwaFile', () => {
  TEST_CASES.forEach(([relativeFilePath, expected]) => {
    it(`${relativeFilePath} -> ${expected}`, () => {
      expect(isIwaFile(relativeFilePath)).toBe(expected);
    });
  });
});
