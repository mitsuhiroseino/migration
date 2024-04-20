import fs from 'fs-extra';

export type ReadBufferOptions = { flag?: string | undefined };

/**
 * ファイルを入力する
 * @param filePath ファイルのパス
 * @param options オプション
 * @returns
 */
export default async function readBuffer(filePath: string, options: ReadBufferOptions = {}): Promise<Buffer> {
  // バイナリファイルを入力
  const { flag } = options;
  const buffer = await fs.readFile(filePath, { flag });
  return buffer;
}
