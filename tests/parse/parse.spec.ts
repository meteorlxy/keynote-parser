import path from 'node:path';
import fastGlob from 'fast-glob';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';
import { parse } from '../../src';

const keynoteFile = path.resolve(__dirname, '../__fixtures__/empty.key');
const keynoteParsedDir = path.resolve(__dirname, '../__temps__/empty');

describe('parse', () => {
  it('should work well', async () => {
    await fs.remove(keynoteParsedDir);
    await parse(keynoteFile, keynoteParsedDir);
    const parsedFiles = await fastGlob('**', {
      cwd: keynoteParsedDir,
      absolute: false,
    });
    expect(parsedFiles.sort()).toMatchSnapshot();
  });
});
