import path from 'node:path';
import fastGlob from 'fast-glob';
import { describe, expect, it } from 'vitest';
import { parseIwa } from '../../src';

const iwaDirectory = path.resolve(__dirname, '../__fixtures__/iwa');

describe('parseIwa', () => {
  it('should work well', async () => {
    const iwaFilePaths = await fastGlob('**/*.iwa', {
      cwd: iwaDirectory,
      absolute: true,
    });

    for (const iwaFilePath of iwaFilePaths) {
      const iwaData = await parseIwa(iwaFilePath);
      expect(iwaData).toMatchSnapshot();
    }
  });
});
