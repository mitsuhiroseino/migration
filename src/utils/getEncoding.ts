import chardet from 'chardet';

export default function getEncoding(buffer: Buffer): string {
  try {
    return chardet.detect(buffer) || 'binary';
  } catch (error) {
    return 'binary';
  }
}
