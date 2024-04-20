import iconv from 'iconv-lite';

export default function toBuffer(str: string, encoding: string): Buffer {
  return iconv.encode(str, encoding);
}
