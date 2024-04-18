import fs from 'fs-extra';

export type WriteBufferOptions = {
  encoding?: BufferEncoding | null | undefined;
  mode?: string | number | undefined;
  flag?: string | undefined;
  signal?: AbortSignal | undefined;
  flush?: boolean | undefined;
};

/**
 * ファイルを出力する
 * @param filePath ファイルのパス
 * @param content ファイルの内容
 * @param options オプション
 * @returns
 */
export default async function writeBuffer(
  filePath: string,
  content: string | NodeJS.ArrayBufferView | null | undefined,
  options: WriteBufferOptions = {},
): Promise<void> {
  // バイナリファイルを出力
  const { mode, flag, signal, flush } = options;
  await fs.writeFile(filePath, content, { mode, flag, signal, flush });
}
