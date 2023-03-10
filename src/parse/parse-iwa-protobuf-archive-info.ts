import varint from 'varint';
import proto from '../../proto/proto';
import type { IwaArchiveInfoData, IwaMessageInfoData } from '../types';
import { getMessageProto } from '../utils';

/**
 * Parse IWA protobuf archive info
 *
 * @see https://github.com/obriensp/iWorkFileFormat/blob/master/Docs/index.md#protobuf
 */
export const parseIwaProtobufArchiveInfo = (
  data: Buffer,
  cursor: number,
): {
  archiveInfoData: IwaArchiveInfoData;
  nextCursor: number;
} => {
  // get the first varint, which is the length of the archive info buffer
  const archiveInfoBufferLength = varint.decode(data, cursor);

  // get the archive info buffer
  const archiveInfoBufferStart = cursor + (varint.decode.bytes as number);
  const archiveInfoBufferEnd = archiveInfoBufferStart + archiveInfoBufferLength;
  const archiveInfoBuffer = data.subarray(
    archiveInfoBufferStart,
    archiveInfoBufferEnd,
  );

  // decode to get the archive info
  const archiveInfo = proto.TSP.ArchiveInfo.decode(
    archiveInfoBuffer,
    archiveInfoBufferLength,
  );

  // decode the messages
  const messages: IwaMessageInfoData[] = [];
  let nextCursor = archiveInfoBufferEnd;
  for (const messageInfo of archiveInfo.messageInfos) {
    // TODO: handle messageInfo.type = 0

    const messageBufferStart = nextCursor;
    const messageBufferEnd = nextCursor + messageInfo.length;
    const messageBuffer = data.subarray(messageBufferStart, messageBufferEnd);
    nextCursor = messageBufferEnd;

    try {
      const { messageProtoName, messageProto } = getMessageProto(messageInfo);
      const message = messageProto.decode(messageBuffer);
      messages.push({
        messageProtoName,
        message,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  return {
    archiveInfoData: {
      archiveInfo,
      messages,
    },
    nextCursor,
  };
};
