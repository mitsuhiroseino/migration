import iconv from 'iconv-lite';

export default function toString(buffer: Buffer, encoding: string): string {
  return iconv.decode(buffer, encoding);
}
