import { describe, expect, it } from 'vitest';
import { isIwaFile } from '../../src';

const testCases: [string, boolean][] = [
  ['Index/foo.iwa', true],
  ['Index/foo.jpg', false],
  ['Metadata/foo.iwa', false],
];

describe('isIwaFile', () => {
  testCases.forEach(([relativeFilePath, expected]) => {
    it(`${relativeFilePath} -> ${expected}`, () => {
      expect(isIwaFile(relativeFilePath)).toBe(expected);
    });
  });
});
