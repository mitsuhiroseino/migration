import fs from 'fs-extra';
import isBuffer from 'lodash/isBuffer';
import isString from 'lodash/isString';
import path from 'path';
import { CONTENT_TYPE } from '../constants';
import { ContentType } from '../types';
import writeBuffer, { WriteBufferOptions } from './writeBuffer';
import writeJson, { WriteJsonOptions } from './writeJson';
import writeText, { WriteTextOptions } from './writeText';

export type WriteAnyFileOptions = WriteBufferOptions &
  WriteJsonOptions &
  WriteTextOptions & {
    /**
     * 親ディレクトリを作成する
     */
    ensure?: boolean;
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
  content: string | Buffer | any,
  options: WriteAnyFileOptions = {},
): Promise<ContentType> {
  const { ensure, encoding, ...rest } = options;
  // 出力先の確保
  if (ensure) {
    const parentPath = path.dirname(filePath);
    await fs.ensureDir(parentPath);
  }

  // contentの型に合わせた出力
  if (isBuffer(content) || encoding === 'binary') {
    // バイナリファイルを出力
    await writeBuffer(filePath, content, rest);
    return CONTENT_TYPE.BINARY;
  } else if (isString(content)) {
    // テキストファイルを出力
    await writeText(filePath, content, rest);
    return CONTENT_TYPE.TEXT;
  } else {
    // JSONファイルを出力
    await writeJson(filePath, content, rest);
    return CONTENT_TYPE.DATA;
  }
}
