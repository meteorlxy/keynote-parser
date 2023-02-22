import type { IwaData } from '../types';
import { parseIwaProtobuf } from './parse-iwa-protobuf';
import { parseIwaSnappy } from './parse-iwa-snappy';

/**
 * Parse IWA file data
 *
 * @see https://github.com/obriensp/iWorkFileFormat/blob/master/Docs/index.md#iwa
 */
export const parseIwa = (data: Buffer): IwaData => {
  const protobufData = parseIwaSnappy(data);
  const iwaData = parseIwaProtobuf(protobufData);
  return iwaData;
};
