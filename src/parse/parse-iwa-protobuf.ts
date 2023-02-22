import type { IwaData } from '../types';
import { parseIwaProtobufArchiveInfo } from './parse-iwa-protobuf-archive-info';

/**
 * Parse IWA protobuf data
 *
 * @see https://github.com/obriensp/iWorkFileFormat/blob/master/Docs/index.md#protobuf
 */
export const parseIwaProtobuf = (data: Buffer): IwaData => {
  // parse the protobuf data one by one and store them in an object
  const iwaData: IwaData = {};
  let cursor = 0;
  while (cursor < data.length) {
    const { archiveInfoData, nextCursor } = parseIwaProtobufArchiveInfo(
      data,
      cursor,
    );
    iwaData[archiveInfoData.archiveInfo.identifier.toString()] =
      archiveInfoData;
    cursor = nextCursor;
  }
  return iwaData;
};
