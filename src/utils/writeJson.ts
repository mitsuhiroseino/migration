import fs from 'fs-extra';
import { DEFAULT_TEXT_ENCODING } from '../constants';

export type WriteJsonOptions = {
  encoding?: BufferEncoding | null | undefined;
  mode?: string | number | undefined;
  flag?: string | undefined;
  EOL?: string | undefined;
  spaces?: string | number | undefined;
  replacer?: ((key: string, value: any) => any) | undefined;
};

/**
 * JSONファイルを出力する
 * @param filePath ファイルのパス
 * @param content ファイルの内容
 * @param options オプション
 * @returns
 */
export default async function writeJson(
  filePath: string,
  content: string | NodeJS.ArrayBufferView | null | undefined,
  options: WriteJsonOptions = {},
): Promise<void> {
  // JSONファイルを出力
  const { encoding = DEFAULT_TEXT_ENCODING, spaces = 2, ...rest } = options;
  await fs.writeJson(filePath, content, { encoding, spaces, ...rest });
}
