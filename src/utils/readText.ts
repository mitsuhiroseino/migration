import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';
import toString from './toString';

export type ReadTextOptions = {
  encoding?: string;
  flag?: string | undefined;
};

/**
 * テキストファイルを入力する
 * @param filePath ファイルのパス
 * @param options オプション
 * @returns
 */
export default async function readText(filePath: string, options: ReadTextOptions = {}): Promise<string> {
  // テキストファイルを入力
  const { encoding = DEFAULT_TEXT_ENCODING, ...rest } = options;
  const buffer = await fs.readFile(filePath, rest);
  const text = toString(buffer, encoding);
  return text;
}
