import decompress from 'decompress';
import fs from 'fs-extra';
import { isIwaFile } from '../utils';
import { parseIwa } from './parse-iwa';

/**
 * Parse and output a keynote file
 *
 * @see https://github.com/obriensp/iWorkFileFormat/blob/master/Docs/index.md#bundle
 */
export const parse = async (
  inputPath: string,
  outputPath = `${inputPath}.unzipped`,
): Promise<void> => {
  // avoid output path conflict
  if (await fs.pathExists(outputPath)) {
    throw new Error(`Output path already exists: ${outputPath}`);
  }

  // unzip keynote file and parse iwa files
  await decompress(inputPath, outputPath, {
    map: (file) => {
      if (!isIwaFile(file.path)) return file;
      return {
        ...file,
        data: Buffer.from(JSON.stringify(parseIwa(file.data), null, 2)),
        path: `${file.path}.json`,
      };
    },
  });
};
