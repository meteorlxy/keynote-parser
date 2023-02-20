import type { IwaData } from '../types';
import { parseIwaProtobufArchiveInfo } from './parse-iwa-protobuf-archive-info';

/**
 * Parse IWA protobuf data
 */
export const parseIwaProtobuf = (data: Buffer): IwaData => {
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
