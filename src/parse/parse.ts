import path from 'node:path';
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

  // unzip keynote file and filter iwa files
  const iwaFiles: decompress.File[] = [];
  await decompress(inputPath, outputPath, {
    filter: (file) => {
      if (isIwaFile(file.path)) {
        iwaFiles.push(file);
        return false;
      }
      return true;
    },
  });

  // parse iwa files and output parsed result to json files
  await Promise.all(
    iwaFiles.map(async (iwaFile) => {
      const iwaData = await parseIwa(iwaFile.data);
      const iwaDataPath = path.resolve(outputPath, `${iwaFile.path}.json`);
      await fs.outputJSON(iwaDataPath, iwaData, { spaces: 2 });
    }),
  );
};
