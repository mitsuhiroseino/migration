import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';

export type ReadJsonOptions = {
  encoding?: string | null | undefined;
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
  const { encoding = DEFAULT_TEXT_ENCODING, ...rest } = options;
  return await fs.readJson(filePath, { encoding, ...rest });
}
