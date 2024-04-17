import Encoding from 'encoding-japanese';
import fs from 'fs-extra';
import path from 'path';
import { CONTENT_TYPE, ITEM_TYPE } from '../../../constants';
import { Content, ContentType, IterationParams, Optional } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import isMatch from '../../../utils/isMatch';
import throwError from '../../../utils/throwError';
import InputFactory from '../InputFactory';
import { INPUT_TYPE } from '../constants';
import { Input, InputGenerator } from '../types';
import { FileInputConfig, FileInputResult } from './types';

/**
 * 指定のパス配下のファイルを読み込むジェネレーター
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const File: Input<Content, FileInputConfig, FileInputResult> = async function* (config, params: IterationParams) {
  const { inputPath } = config;
  const rootPath: string = finishDynamicValue(inputPath, params, config);
  const availablePath = await fs.exists(rootPath);
  if (availablePath) {
    // ファイルの読み込み
    yield* readFiles(rootPath, path.dirname(rootPath), path.basename(rootPath), config, params);
  } else {
    throwError(`"${rootPath}" does not exist.`, config);
  }
};
InputFactory.register(INPUT_TYPE.FILE, File);
export default File;

/**
 * 指定のパス配下のファイルを読み込む関数
 * @param inputPath 入力パス
 * @param inputItem ファイル・ディレクトリ名
 * @param inputParentPath 親ディレクトリのパス
 * @param config コンフィグ
 * @param params 1繰り返し毎のパラメーター
 * @param inputRootPath ルートのパス
 * @param depth ルートからの深さ
 */
const readFiles = async function* (
  inputPath: string,
  inputItem: string,
  inputParentPath: string,
  config: Optional<FileInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number = 0,
): InputGenerator<Content, FileInputResult> {
  if (!isMatch(inputPath, config.filter, params)) {
    // フィルタリングされた場合
    return;
  }

  const itemType = config.itemType;
  const inputParentRelativePath = path.relative(inputRootPath, inputParentPath);
  const stat = await fs.stat(inputPath);
  if (stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルを読み込んで返す
    const { inputBinary, inputEncoding, copy } = config;
    const result: FileInputResult = {
      inputItemType: ITEM_TYPE.LEAF,
      inputPath,
      inputParentPath,
      inputRootPath,
      inputParentRelativePath,
      inputItem,
    };
    if (copy) {
      // ファイルのコピーをするための情報のみを返す
      yield {
        result,
      };
    } else {
      // ファイルの入力
      const buffer = await fs.readFile(inputPath);
      let encoding: any;
      if (inputBinary) {
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
        encoding = inputEncoding || encoding;
        content = buffer.toString(encoding);
        contentType = CONTENT_TYPE.TEXT;
      }
      result.inputContentType = contentType;
      result.inputEncoding = encoding;
      yield {
        content,
        result,
      };
    }
  } else {
    if (!itemType || itemType === ITEM_TYPE.NODE) {
      yield {
        result: {
          inputItemType: ITEM_TYPE.NODE,
          inputPath,
          inputParentPath,
          inputRootPath,
          inputParentRelativePath,
          inputItem,
        },
      };
    }
    // 配下のディレクトリ、ファイルを再帰的に処理
    const nextDepth = depth + 1;
    if (!config.ignoreSubDir || nextDepth !== 0) {
      const items = await fs.readdir(inputPath);
      for (const item of items) {
        const itemPath = path.join(inputPath, item);
        // 子要素を処理
        try {
          yield* readFiles(itemPath, inputPath, item, config, params, inputRootPath, depth + 1);
        } catch (error) {}
      }
    }
  }
};
