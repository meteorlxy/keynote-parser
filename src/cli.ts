import path from 'node:path';
import process from 'node:process';
import { parse } from './parse';

export const cli = (): void => {
  // get input and output args
  const input = process.argv[2];
  const output = process.argv[3] || `${input}.parsed`;

  // resolve paths according to cwd
  const cwd = process.cwd();
  const inputPath = path.resolve(cwd, input);
  const outputPath = path.resolve(cwd, output);

  // parse
  parse(inputPath, outputPath).catch((error) => {
    console.error(error);
    process.exit(1);
  });
};
