import fs from 'fs-extra';
import path from 'path';
import { FsInputResultBase } from 'src/io/types';
import { CONTENT_TYPE, ITEM_TYPE } from '../../../constants';
import { Content, ContentType, IterationParams, Optional } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import getEncoding from '../../../utils/getEncoding';
import isMatch from '../../../utils/isMatch';
import readAnyFile from '../../../utils/readAnyFile';
import removeExtension from '../../../utils/removeExtension';
import throwError from '../../../utils/throwError';
import toString from '../../../utils/toString';
import { IO_TYPE } from '../../constants';
import { InputGenerator, InputReturnValue } from '../../types';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { FsInputConfig, FsInputResult } from './types';

type CallbackFn = (
  inputPath: string,
  inputItem: string,
  config: Optional<FsInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath?: string,
  depth?: number,
) => InputGenerator<Content, FsInputResult>;

/**
 * ファイル・ディレクトリの読み込み、コピーを行うクラス
 */
class Fs extends InputBase<Content, FsInputConfig, FsInputResult> {
  /**
   * ファイル・ディレクトリの読み込み
   * @param params
   * @returns
   */
  read(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return this._generateFs(this._readFs, this._config, params);
  }

  /**
   * ファイル・ディレクトリのコピー
   * @param params
   * @returns
   */
  copy(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return this._generateFs(this._copyFs, this._config, params);
  }

  /**
   * 指定のパス配下のファイルを読み込むジェネレーター
   * @param callback read or copy
   * @param config 入力設定
   * @param params 1繰り返し毎のパラメーター
   */
  private async *_generateFs(
    callback: CallbackFn,
    config: FsInputConfig,
    params: IterationParams,
  ): InputGenerator<Content, FsInputResult> {
    const { inputPath } = config;
    const rootPath: string = path.normalize(finishDynamicValue(inputPath, params, config));
    const availablePath = await fs.exists(rootPath);
    if (availablePath) {
      // ファイルの読み込み
      yield* callback(rootPath, path.basename(rootPath), config, params);
    } else {
      throwError(`"${rootPath}" does not exist.`, config);
    }
  }

  /**
   * 指定のパス配下のファイルを読み込む関数
   * @param inputPath 入力パス
   * @param inputItem ファイル・ディレクトリ名
   * @param config コンフィグ
   * @param params 1繰り返し毎のパラメーター
   * @param inputRootPath ルートのパス
   * @param depth ルートからの深さ
   */
  private async *_readFs(
    inputPath: string,
    inputItem: string,
    config: Optional<FsInputConfig, 'type'>,
    params: IterationParams,
    inputRootPath: string = inputPath,
    depth: number = 0,
  ): InputGenerator<Content, FsInputResult> {
    const isTarget = isMatch(inputPath, config.filter, params);
    const itemType = config.itemType;

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
      yield* this._toNextDeps(this._readFs, inputPath, config, params, inputRootPath, depth);
    } else if (stat.isFile()) {
      // ファイルの場合
      if (isTarget && (!itemType || itemType === ITEM_TYPE.LEAF)) {
        // ファイルを読み込んで返す
        const { inputEncoding, removeExtensions } = config;
        // ファイルの入力
        const buffer: Buffer = await readAnyFile(inputPath, { encoding: 'binary' });
        let encoding: string = inputEncoding;
        if (!encoding) {
          // エンコーディングの指定が無い場合は入力の内容から判断
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
            inputItemType: ITEM_TYPE.LEAF,
            inputContentType,
            inputEncoding: encoding,
            ...this._getInputInfo(inputPath, inputItem, inputRootPath, removeExtensions),
          },
        };
      }
    }
  }

  /**
   * 指定のパス配下のファイルを読み込む関数
   * @param inputPath 入力パス
   * @param inputItem ファイル・ディレクトリ名
   * @param config コンフィグ
   * @param params 1繰り返し毎のパラメーター
   * @param inputRootPath ルートのパス
   * @param depth ルートからの深さ
   */
  private async *_copyFs(
    inputPath: string,
    inputItem: string,
    config: Optional<FsInputConfig, 'type'>,
    params: IterationParams,
    inputRootPath: string = inputPath,
    depth: number = 0,
  ): InputGenerator<Content, FsInputResult> {
    const isTarget = isMatch(inputPath, config.filter, params);
    const itemType = config.itemType;

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
      yield* this._toNextDeps(this._copyFs, inputPath, config, params, inputRootPath, depth);
    } else if (stat.isFile()) {
      // ファイルの場合
      if (isTarget && (!itemType || itemType === ITEM_TYPE.LEAF)) {
        // ファイルのコピーをするための情報のみを返す
        const { removeExtensions } = config;
        yield {
          result: {
            inputItemType: ITEM_TYPE.LEAF,
            ...this._getInputInfo(inputPath, inputItem, inputRootPath, removeExtensions),
          },
        };
      }
    }
  }

  private async *_toNextDeps(
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
          yield* callback(itemPath, item, config, params, inputRootPath, nextDepth);
        } catch (error) {
          throw error;
        }
      }
    }
  }

  private _getInputInfo(
    inputPath: string,
    inputItem: string,
    inputRootPath: string,
    removeExtensions: string | string[],
  ) {
    const tidyInputItem = removeExtension(inputItem, removeExtensions);
    const tidyInputPath = removeExtension(inputPath, removeExtensions);
    const tidyInputRootPath = inputRootPath === inputPath ? tidyInputPath : inputRootPath;
    return {
      inputItem: tidyInputItem,
      inputPath: tidyInputPath,
      inputRootPath: tidyInputRootPath,
    };
  }
}
InputFactory.register(IO_TYPE.FS, Fs);
export default Fs;
