import fs from 'node:fs/promises';
import path from 'node:path';
import decompress from 'decompress';
import fastGlob from 'fast-glob';
import { describe, expect, it } from 'vitest';
import { parseIwa } from '../src';

const keynoteFile = path.resolve(__dirname, '__fixtures__/empty.key');
const keynoteUnzippedDirectory = path.resolve(__dirname, '__temps__');
const keynoteIwaDirectory = path.resolve(keynoteUnzippedDirectory, 'Index');

describe('parseIwa', () => {
  it('should work well', async () => {
    await decompress(keynoteFile, keynoteUnzippedDirectory);

    const iwaFilePaths = await fastGlob('**/*.iwa', {
      cwd: keynoteIwaDirectory,
      absolute: true,
    });

    for (const iwaFilePath of iwaFilePaths) {
      const iwaJsonFilePath = `${iwaFilePath}.json`;
      const iwaData = await parseIwa(iwaFilePath);
      await fs.writeFile(iwaJsonFilePath, JSON.stringify(iwaData, null, 2));
      expect(iwaData).toMatchSnapshot();
    }
  });
});
