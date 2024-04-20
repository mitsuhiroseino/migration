import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';
import toString from './toString';

export type ReadJsonOptions = {
  encoding?: string;
  flag?: string | undefined;
  throws?: boolean | undefined;
  reviver?: ((key: any, value: any) => any) | undefined;
};

/**
 * JSONファイルを入力する
 * @param filePath ファイルのパス
 * @param options オプション
 * @returns
 */
export default async function readJson(filePath: string, options: ReadJsonOptions = {}): Promise<any> {
  // JSONファイルを出力
  const { encoding = DEFAULT_TEXT_ENCODING, reviver, ...rest } = options;
  const buffer = await fs.readFile(filePath, rest);
  const text = toString(buffer, encoding);
  const json = JSON.parse(text, reviver);
  return json;
}
