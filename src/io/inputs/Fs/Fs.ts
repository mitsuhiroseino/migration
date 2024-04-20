import Encoding from 'encoding-japanese';
import fs from 'fs-extra';
import path from 'path';
import { FsInputResultBase } from 'src/io/types';
import { CONTENT_TYPE, ITEM_TYPE } from '../../../constants';
import { Content, ContentType, IterationParams, Optional } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import isMatch from '../../../utils/isMatch';
import readAnyFile from '../../../utils/readAnyFile';
import throwError from '../../../utils/throwError';
import { IO_TYPE } from '../../constants';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { InputGenerator, InputReturnValue } from '../types';
import { FsInputConfig, FsInputResult } from './types';

class Fs extends InputBase<Content, FsInputConfig, FsInputResult> {
  read(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return FsGenerator(readFiles, this._config, params);
  }
  copy(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return FsGenerator(copyFiles, this._config, params);
  }
}
InputFactory.register(IO_TYPE.FS, Fs);
export default Fs;

/**
 * 指定のパス配下のファイルを読み込むジェネレーター
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const FsGenerator = async function* (
  fn: (
    inputPath: string,
    inputParentPath: string,
    inputItem: string,
    config: Optional<FsInputConfig, 'type'>,
    params: IterationParams,
  ) => InputGenerator<Content, FsInputResult>,
  config: FsInputConfig,
  params: IterationParams,
): InputGenerator<Content, FsInputResult> {
  const { inputPath } = config;
  const rootPath: string = path.normalize(finishDynamicValue(inputPath, params, config));
  const availablePath = await fs.exists(rootPath);
  if (availablePath) {
    // ファイルの読み込み
    yield* fn(rootPath, path.dirname(rootPath), path.basename(rootPath), config, params);
  } else {
    throwError(`"${rootPath}" does not exist.`, config);
  }
};

/**
 * 指定のパス配下のファイルを読み込む関数
 * @param inputPath 入力パス
 * @param inputParentPath 親ディレクトリのパス
 * @param inputItem ファイル・ディレクトリ名
 * @param config コンフィグ
 * @param params 1繰り返し毎のパラメーター
 * @param inputRootPath ルートのパス
 * @param depth ルートからの深さ
 */
const readFiles = async function* (
  inputPath: string,
  inputParentPath: string,
  inputItem: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number = 0,
): InputGenerator<Content, FsInputResult> {
  if (!isMatch(inputPath, config.filter, params)) {
    // フィルタリングされた場合
    return;
  }

  const itemType = config.itemType;
  const inputParentRelativePath = path.relative(inputRootPath, inputParentPath);
  const stat = await fs.stat(inputPath);
  if (stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルを読み込んで返す
    const { inputBinary, inputEncoding } = config;
    const result: FsInputResult = {
      inputItemType: ITEM_TYPE.LEAF,
      inputPath,
      inputParentPath,
      inputRootPath,
      inputParentRelativePath,
      inputItem,
    };
    // ファイルの入力
    const buffer: Buffer = await readAnyFile(inputPath, { binary: true });
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
    if (!config.ignoreSubDir || nextDepth === 1) {
      const items = await fs.readdir(inputPath);
      for (const item of items) {
        const itemPath = path.join(inputPath, item);
        // 子要素を処理
        try {
          yield* readFiles(itemPath, inputPath, item, config, params, inputRootPath, nextDepth);
        } catch (error) {
          throw error;
        }
      }
    }
  }
};

/**
 * 指定のパス配下のファイルを読み込む関数
 * @param inputPath 入力パス
 * @param inputParentPath 親ディレクトリのパス
 * @param inputItem ファイル・ディレクトリ名
 * @param config コンフィグ
 * @param params 1繰り返し毎のパラメーター
 * @param inputRootPath ルートのパス
 * @param depth ルートからの深さ
 */
const copyFiles = async function* (
  inputPath: string,
  inputParentPath: string,
  inputItem: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number = 0,
): InputGenerator<Content, FsInputResult> {
  if (!isMatch(inputPath, config.filter, params)) {
    // フィルタリングされた場合
    return;
  }

  const itemType = config.itemType;
  const inputParentRelativePath = path.relative(inputRootPath, inputParentPath);
  const stat = await fs.stat(inputPath);
  if (stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルのコピーをするための情報のみを返す
    yield {
      result: {
        inputItemType: ITEM_TYPE.LEAF,
        inputPath,
        inputParentPath,
        inputRootPath,
        inputParentRelativePath,
        inputItem,
      },
    };
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
    if (!config.ignoreSubDir || nextDepth === 1) {
      const items = await fs.readdir(inputPath);
      for (const item of items) {
        const itemPath = path.join(inputPath, item);
        // 子要素を処理
        try {
          yield* copyFiles(itemPath, inputPath, item, config, params, inputRootPath, nextDepth);
        } catch (error) {
          throw error;
        }
      }
    }
  }
};
