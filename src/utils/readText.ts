import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';

export type ReadTextOptions = {
  encoding?: null | undefined;
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
  return await fs.readFile(filePath, { encoding, ...rest });
}
