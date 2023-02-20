import snappy from 'snappy';

/**
 * Unpack IWA file chunk data from snappy frame
 *
 * - 0: 0x00
 * - 1 ~ 3: length of the chunk data (little-endian)
 * - 4 ~ 4 + chunk data length: snappy compressed chunk data
 *
 * @see https://github.com/obriensp/iWorkFileFormat/blob/master/Docs/index.md#snappy-compression
 */
export const parseIwaSnappyFrame = async (
  data: Buffer,
  cursor: number,
): Promise<{
  chunk: Buffer;
  nextCursor: number;
}> => {
  // the first byte of the frame is always 0x00
  if (data[cursor] !== 0x00) {
    throw new Error('Invalid IWA snappy frame');
  }
  // the 1-3 bytes of the frame are the data length of the chunk
  const chunkBufferLength = data.readUintLE(cursor + 1, 3);
  // length of the whole frame
  const chunkBufferStart = cursor + 4;
  const chunkBufferEnd = chunkBufferStart + chunkBufferLength;
  // the snappy compressed chunk data
  const chunkBuffer = data.subarray(chunkBufferStart, chunkBufferEnd);
  // uncompress the chunk data
  const chunk = (await snappy.uncompress(chunkBuffer)) as Buffer;

  return {
    chunk,
    nextCursor: chunkBufferEnd,
  };
};
