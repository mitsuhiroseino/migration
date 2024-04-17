import fs from 'fs-extra';
import isBuffer from 'lodash/isBuffer';
import isString from 'lodash/isString';
import path from 'path';
import writeFile, { WriteFileOptions } from './writeFile';
import writeJson, { WriteJsonOptions } from './writeJson';
import writeText, { WriteTextOptions } from './writeText';

export type WriteAnyFileOptions = WriteFileOptions &
  WriteJsonOptions &
  WriteTextOptions & {
    /**
     * 内容がnullの場合はスキップ
     */
    skipNullContent?: boolean;

    /**
     * 親ディレクトリのあることが保証されている
     */
    ensured?: boolean;

    /**
     * バイナリで出力する
     */
    binary?: boolean;
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
  const { skipNullContent, ensured, binary, ...rest } = options;
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
    if (isBuffer(content) || binary) {
      // バイナリファイルを出力
      await writeFile(filePath, content, rest);
    } else if (isString(content)) {
      // テキストファイルを出力
      await writeText(filePath, content, rest);
    } else {
      // JSONファイルを出力
      await writeJson(filePath, content, rest);
    }

    return true;
  }
}
