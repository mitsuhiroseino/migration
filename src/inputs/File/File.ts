import Encoding from 'encoding-japanese';
import fs from 'fs-extra';
import path from 'path';
import { CONTENT_TYPE } from '../../constants';
import { Content, ContentType, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import { InputGenerator, InputResult } from '../types';
import { FileInputConfig } from './types';

/**
 * 指定のパス配下のファイルを読み込むジェネレーター
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
async function* File(config: FileInputConfig, params: IterationParams): InputGenerator<Content> {
  const { inputPath } = config;
  const rootPath: string = finishDynamicValue(inputPath, params, config);
  // ファイルの読み込み
  yield* readFiles(rootPath, path.basename(rootPath), config);
}
export default File;

/**
 * 指定のパス配下のファイルを読み込む関数
 * @param inputPath 入力パス
 * @param itemName ファイル・ディレクトリ名
 * @param config コンフィグ
 * @param depth ルートからの深さ
 */
const readFiles = async function* (
  inputPath: string,
  itemName: string,
  config: FileInputConfig,
  depth: number = 0,
): AsyncGenerator<InputResult<Content>> {
  if (!config.ignoreSubDir || depth === 0) {
    const stat = await fs.stat(inputPath);
    if (stat.isFile()) {
      // ファイルを読み込んで返す
      const { binary, inputEncoding } = config;
      // ファイルの入力
      const buffer = await fs.readFile(inputPath);
      let encoding: any;
      if (binary) {
        encoding = 'BINARY';
      } else {
        encoding = Encoding.detect(buffer);
      }
      let content: Buffer | string;
      let contentType: ContentType;
      if (!encoding || encoding === 'BINARY') {
        // バイナリファイルの場合
        content = buffer;
        contentType = CONTENT_TYPE.BINARY;
      } else {
        // テキストファイルの場合
        content = buffer.toString(inputEncoding || encoding);
        contentType = CONTENT_TYPE.TEXT;
      }
      yield { content, params: { inputPath, itemName, contentType } };
    } else {
      // 配下のディレクトリ、ファイルを再帰的に処理
      const items = await fs.readdir(inputPath);
      for (const item of items) {
        const itemPath = path.join(inputPath, item);
        // 子要素を処理
        yield* readFiles(itemPath, item, config, depth + 1);
      }
    }
  }
};
