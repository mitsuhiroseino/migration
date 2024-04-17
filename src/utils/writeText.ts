import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';

export type WriteTextOptions = {
  encoding?: BufferEncoding | null | undefined;
  mode?: string | number | undefined;
  flag?: string | undefined;
  signal?: AbortSignal | undefined;
  flush?: boolean | undefined;
};

/**
 * テキストファイルを出力する
 * @param filePath ファイルのパス
 * @param content ファイルの内容
 * @param options オプション
 * @returns
 */
export default async function writeText(
  filePath: string,
  content: string | NodeJS.ArrayBufferView | null | undefined,
  options: WriteTextOptions = {},
): Promise<void> {
  // テキストファイルを出力
  const { encoding = DEFAULT_TEXT_ENCODING, ...rest } = options;
  fs.writeFile(filePath, content, { encoding, ...rest });
}
