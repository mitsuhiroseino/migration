import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';
import toBuffer from './toBuffer';

export type WriteJsonOptions = {
  encoding?: string;
  mode?: string | number | undefined;
  flag?: string | undefined;
  space?: string | number | undefined;
  replacer?: ((key: string, value: any) => any) | undefined;
};

/**
 * JSONファイルを出力する
 * @param filePath ファイルのパス
 * @param content ファイルの内容
 * @param options オプション
 * @returns
 */
export default async function writeJson(filePath: string, content: any, options: WriteJsonOptions = {}): Promise<void> {
  // JSONファイルを出力
  const { replacer, space = 2, encoding = DEFAULT_TEXT_ENCODING, ...rest } = options;
  const json = JSON.stringify(content, replacer, space);
  const buffer = toBuffer(json, encoding);
  await fs.writeFile(filePath, buffer, rest);
}
