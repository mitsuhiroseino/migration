import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';
import toBuffer from './toBuffer';

export type WriteTextOptions = {
  encoding?: string;
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
  content: string,
  options: WriteTextOptions = {},
): Promise<void> {
  // テキストファイルを出力
  const { encoding = DEFAULT_TEXT_ENCODING, ...rest } = options;
  const buffer = toBuffer(content, encoding);
  await fs.writeFile(filePath, buffer, rest);
}
