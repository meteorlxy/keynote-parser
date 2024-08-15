import path from 'node:path';
import fastGlob from 'fast-glob';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';
import { parseIwa } from '../../src';

const IWA_DIR = path.resolve(__dirname, '../__fixtures__/iwa');

describe('parseIwa', () => {
  it('should work well', async () => {
    const iwaFilePaths = await fastGlob('**/*.iwa', {
      cwd: IWA_DIR,
      absolute: true,
    });

    for (const iwaFilePath of iwaFilePaths) {
      const data = await fs.readFile(iwaFilePath);
      const iwaData = parseIwa(data);
      expect(iwaData).toMatchSnapshot();
    }
  });
});
