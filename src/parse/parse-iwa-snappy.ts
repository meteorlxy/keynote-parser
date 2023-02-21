import { parseIwaSnappyFrame } from './parse-iwa-snappy-frame';

/**
 * Parse IWA file snappy-compressed data
 *
 * @see https://github.com/obriensp/iWorkFileFormat/blob/master/Docs/index.md#snappy-compression
 */
export const parseIwaSnappy = async (data: Buffer): Promise<Buffer> => {
  // unpack the snappy frames one by one
  const chunks: Buffer[] = [];
  let cursor = 0;
  while (cursor < data.length - 4) {
    const { chunk, nextCursor } = await parseIwaSnappyFrame(data, cursor);
    chunks.push(chunk);
    cursor = nextCursor;
  }
  return Buffer.concat(chunks);
};
