import fs from 'fs-extra';

export type WriteBufferOptions = {
  mode?: string | number | undefined;
  flag?: string | undefined;
  signal?: AbortSignal | undefined;
  flush?: boolean | undefined;
};

/**
 * ファイルを出力する
 * @param filePath ファイルのパス
 * @param buffer ファイルの内容
 * @param options オプション
 * @returns
 */
export default async function writeBuffer(
  filePath: string,
  buffer: Buffer,
  options: WriteBufferOptions = {},
): Promise<void> {
  // バイナリファイルを出力
  const { mode, flag, signal, flush } = options;
  await fs.writeFile(filePath, buffer, { mode, flag, signal, flush });
}
