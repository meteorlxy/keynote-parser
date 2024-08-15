import path from 'node:path';
import fastGlob from 'fast-glob';
import fs from 'fs-extra';
import { describe, expect, it } from 'vitest';
import { parse } from '../../src';

const KEYNOTE_FILE = path.resolve(__dirname, '../__fixtures__/empty.key');
const KEYNOTE_PARSED_DIR = path.resolve(__dirname, '../__temps__/empty');

describe('parse', () => {
  it('should work well', async () => {
    await fs.remove(KEYNOTE_PARSED_DIR);
    await parse(KEYNOTE_FILE, KEYNOTE_PARSED_DIR);
    const parsedFiles = await fastGlob('**', {
      cwd: KEYNOTE_PARSED_DIR,
      absolute: false,
    });
    expect(parsedFiles.sort()).toMatchSnapshot();
  });
});
