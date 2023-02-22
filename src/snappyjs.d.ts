declare module 'snappyjs' {
  export function compress(input: Buffer): Buffer;
  export function uncompress(input: Buffer): Buffer;
}
