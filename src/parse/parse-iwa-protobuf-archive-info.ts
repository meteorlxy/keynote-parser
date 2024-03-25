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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const archiveInfoBufferStart = cursor + varint.decode.bytes!;
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
    // @see https://github.com/psobot/keynote-parser/blob/48d4204ab943fc7ee75fd14881a54ad5264680f5/keynote_parser/codec.py#L189-L193

    const messageBufferStart = nextCursor;
    const messageBufferEnd = nextCursor + messageInfo.length;
    const messageBuffer = data.subarray(messageBufferStart, messageBufferEnd);
    nextCursor = messageBufferEnd;

    try {
      const { messageProtoName, messageProto } = getMessageProto(messageInfo);
      const message = messageProto.decode(messageBuffer);
      messages.push({ messageProtoName, message });
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      console.warn('Skip message, reason:', error.message);
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
