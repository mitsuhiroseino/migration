import fs from 'fs-extra';
import path from 'path';
import { FsInputResultBase } from 'src/io/types';
import { CONTENT_TYPE, ITEM_TYPE } from '../../../constants';
import { Content, ContentType, IterationParams, Optional } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import getEncoding from '../../../utils/getEncoding';
import isMatch from '../../../utils/isMatch';
import readAnyFile from '../../../utils/readAnyFile';
import throwError from '../../../utils/throwError';
import toString from '../../../utils/toString';
import { IO_TYPE } from '../../constants';
import { InputGenerator, InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
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
    return generateFs(readFs, this._config, params);
  }
  copy(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return generateFs(copyFs, this._config, params);
  }
}
InputFactory.register(IO_TYPE.FS, Fs);
export default Fs;

/**
 * 指定のパス配下のファイルを読み込むジェネレーター
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const generateFs = async function* (
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
const readFs: CallbackFn = async function* (
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
          inputItem,
          inputItemType: ITEM_TYPE.NODE,
          inputPath,
          inputRootPath,
        },
      };
    }
    // 配下のディレクトリ、ファイルを再帰的に処理
    yield* toNextDeps(readFs, inputPath, config, params, inputRootPath, depth);
  } else if (isTarget && stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルを読み込んで返す
    const { inputEncoding } = config;
    // ファイルの入力
    const buffer: Buffer = await readAnyFile(inputPath, { encoding: 'binary' });
    let encoding: string = inputEncoding;
    if (!encoding) {
      encoding = getEncoding(buffer);
    }
    let content: Buffer | string;
    let inputContentType: ContentType;
    if (encoding.toLowerCase() === 'binary') {
      // バイナリファイルの場合
      content = buffer;
      inputContentType = CONTENT_TYPE.BINARY;
    } else {
      // テキストファイルの場合
      content = toString(buffer, encoding);
      inputContentType = CONTENT_TYPE.TEXT;
    }
    yield {
      content,
      result: {
        inputItem,
        inputItemType: ITEM_TYPE.LEAF,
        inputContentType,
        inputPath,
        inputRootPath,
        inputEncoding: encoding,
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
const copyFs: CallbackFn = async function* (
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
          inputItem,
          inputItemType: ITEM_TYPE.NODE,
          inputPath,
          inputRootPath,
        },
      };
    }
    // 配下のディレクトリ、ファイルを再帰的に処理
    yield* toNextDeps(copyFs, inputPath, config, params, inputRootPath, depth);
  } else if (isTarget && stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルのコピーをするための情報のみを返す
    yield {
      result: {
        inputItem,
        inputItemType: ITEM_TYPE.LEAF,
        inputPath,
        inputRootPath,
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
