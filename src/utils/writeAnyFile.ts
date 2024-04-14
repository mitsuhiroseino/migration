import fs from 'fs-extra';
import isBuffer from 'lodash/isBuffer';
import isString from 'lodash/isString';
import path from 'path';

export type WriteAnyFileOptions = {
  // writeFile、writeJson共通のオプション
  encoding?: BufferEncoding | null | undefined;
  mode?: string | number | undefined;
  flag?: string | undefined;

  // writeFileのオプション
  signal?: AbortSignal | undefined;
  flush?: boolean | undefined;

  // writeJsonのオプション
  EOL?: string | undefined;
  spaces?: string | number | undefined;
  replacer?: ((key: string, value: any) => any) | undefined;

  /**
   * 内容がnullの場合はスキップ
   */
  skipNullContent?: boolean;

  /**
   * 親ディレクトリのあることが保証されている
   */
  ensured?: boolean;
};

/**
 * ファイルを出力する
 * @param filePath ファイルのパス
 * @param content ファイルの内容
 * @param options オプション
 * @returns
 */
export default async function writeAnyFile(
  filePath: string,
  content: string | NodeJS.ArrayBufferView | null | undefined,
  options: WriteAnyFileOptions = {},
): Promise<boolean> {
  const { skipNullContent, ensured, ...rest } = options;
  if (content == null) {
    if (skipNullContent) {
      // contentがnullの場合でも処理は継続
      return false;
    } else {
      // エラー
      throw new Error('No content provided for file output.');
    }
  } else {
    // 出力先の確保
    if (!ensured) {
      const parentPath = path.dirname(filePath);
      await fs.ensureDir(parentPath);
    }

    // contentの型に合わせた出力
    if (isString(content)) {
      // テキストファイルを出力
      const { encoding = 'utf8', mode, flag, signal, flush } = rest;
      fs.writeFile(filePath, content, { encoding, mode, flag, signal, flush });
    } else if (isBuffer(content)) {
      // バイナリファイルを出力
      const { mode, flag, signal, flush } = rest;
      fs.writeFile(filePath, content, { mode, flag, signal, flush });
    } else {
      // JSONファイルを出力
      const { encoding = 'utf8', mode, flag, EOL, spaces, replacer } = rest;
      await fs.writeJson(filePath, content, { encoding, mode, flag, EOL, spaces, replacer });
    }

    return true;
  }
}
