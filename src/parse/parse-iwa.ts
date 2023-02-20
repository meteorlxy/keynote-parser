import fs from 'node:fs/promises';
import type { IwaData } from '../types';
import { parseIwaProtobuf } from './parse-iwa-protobuf';
import { parseIwaSnappy } from './parse-iwa-snappy';

/**
 * Parse IWA file
 */
export const parseIwa = async (file: string): Promise<IwaData> => {
  const rawData = await fs.readFile(file);
  const protobufData = await parseIwaSnappy(rawData);
  const iwaData = parseIwaProtobuf(protobufData);
  return iwaData;
};
