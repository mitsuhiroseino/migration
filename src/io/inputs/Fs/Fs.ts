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

type CallbackFn = (
  inputPath: string,
  inputParentPath: string,
  inputItem: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath?: string,
  depth?: number,
) => InputGenerator<Content, FsInputResult>;

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
  callback: CallbackFn,
  config: FsInputConfig,
  params: IterationParams,
): InputGenerator<Content, FsInputResult> {
  const { inputPath } = config;
  const rootPath: string = path.normalize(finishDynamicValue(inputPath, params, config));
  const availablePath = await fs.exists(rootPath);
  if (availablePath) {
    // ファイルの読み込み
    yield* callback(rootPath, path.dirname(rootPath), path.basename(rootPath), config, params);
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
const readFiles: CallbackFn = async function* (
  inputPath: string,
  inputParentPath: string,
  inputItem: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number = 0,
): InputGenerator<Content, FsInputResult> {
  const isTarget = isMatch(inputPath, config.filter, params);
  const itemType = config.itemType;
  const inputParentRelativePath = path.relative(inputRootPath, inputParentPath);
  const stat = await fs.stat(inputPath);
  if (stat.isDirectory()) {
    // ディレクトリの場合
    if (isTarget && (!itemType || itemType === ITEM_TYPE.NODE)) {
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
    yield* toNextDeps(readFiles, inputPath, config, params, inputRootPath, depth);
  } else if (isTarget && stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルを読み込んで返す
    const { inputBinary, inputEncoding: defaultEncoding } = config;
    // ファイルの入力
    const buffer: Buffer = await readAnyFile(inputPath, { binary: true });
    let inputEncoding: any;
    if (inputBinary) {
      inputEncoding = 'BINARY';
    } else {
      inputEncoding = Encoding.detect(buffer);
    }
    let content: Buffer | string;
    let inputContentType: ContentType;
    if (!inputEncoding || inputEncoding === 'BINARY') {
      // バイナリファイルの場合
      content = buffer;
      inputContentType = CONTENT_TYPE.BINARY;
    } else {
      // テキストファイルの場合
      inputEncoding = defaultEncoding || inputEncoding;
      content = buffer.toString(inputEncoding);
      inputContentType = CONTENT_TYPE.TEXT;
    }
    yield {
      content,
      result: {
        inputItemType: ITEM_TYPE.LEAF,
        inputPath,
        inputParentPath,
        inputRootPath,
        inputParentRelativePath,
        inputItem,
        inputContentType,
        inputEncoding,
      },
    };
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
const copyFiles: CallbackFn = async function* (
  inputPath: string,
  inputParentPath: string,
  inputItem: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number = 0,
): InputGenerator<Content, FsInputResult> {
  const isTarget = isMatch(inputPath, config.filter, params);
  const itemType = config.itemType;
  const inputParentRelativePath = path.relative(inputRootPath, inputParentPath);
  const stat = await fs.stat(inputPath);
  if (stat.isDirectory()) {
    if (isTarget && (!itemType || itemType === ITEM_TYPE.NODE)) {
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
    yield* toNextDeps(copyFiles, inputPath, config, params, inputRootPath, depth);
  } else if (isTarget && stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
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
  }
};

async function* toNextDeps(
  callback: CallbackFn,
  inputPath: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number,
) {
  // 配下のディレクトリ、ファイルを再帰的に処理
  const nextDepth = depth + 1;
  if (!config.ignoreSubDir || nextDepth === 1) {
    const items = await fs.readdir(inputPath);
    for (const item of items) {
      const itemPath = path.join(inputPath, item);
      // 子要素を処理
      try {
        yield* callback(itemPath, inputPath, item, config, params, inputRootPath, nextDepth);
      } catch (error) {
        throw error;
      }
    }
  }
}
