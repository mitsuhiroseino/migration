import fs from 'fs-extra';
import path from 'path';
import { FsInputResultBase } from 'src/io/types';
import { CONTENT_TYPE, ITEM_TYPE } from '../../../constants';
import { Content, ContentType, DiffParams, IterationParams } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import fsStat from '../../../utils/fsStat';
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
    return this._generateFs(this._readFs, params);
  }

  /**
   * ファイル・ディレクトリのコピー
   * @param params
   * @returns
   */
  copy(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return this._generateFs(this._copyFs, params);
  }

  /**
   * ファイル・ディレクトリの移動
   * @param params
   * @returns
   */
  move(params: IterationParams): AsyncIterable<InputReturnValue<any, FsInputResultBase>> {
    return this._generateFs(this._copyFs, params);
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    const _inputPath = params._inputPath as string;
    await fs.remove(_inputPath);
    return {};
  }

  /**
   * 指定のパス配下のファイルを読み込むジェネレーター
   * @param callback read or copy
   * @param config 入力設定
   * @param params 1繰り返し毎のパラメーター
   */
  private async *_generateFs(callback: CallbackFn, params: IterationParams): InputGenerator<Content, FsInputResult> {
    const config = this._config;
    const { inputPath, skipIfNoInput } = config;
    const rootPath: string = path.normalize(finishDynamicValue(inputPath, params, config));
    const availablePath = await fs.exists(rootPath);
    if (availablePath) {
      // ファイルの読み込み
      yield* callback.call(this, rootPath, path.basename(rootPath), params);
    } else {
      if (!skipIfNoInput) {
        throwError(`"${rootPath}" does not exist.`, config);
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
  private async *_readFs(
    inputPath: string,
    inputItem: string,
    params: IterationParams,
    inputRootPath: string = inputPath,
    depth: number = 0,
  ): InputGenerator<Content, FsInputResult> {
    const config = this._config;
    const { filter, itemType, ignoreSymlinks } = config;
    const isTarget = isMatch(inputPath, filter, params);

    const stat = await fsStat(inputPath, { ignoreSymlinks });
    if (stat.isDirectory()) {
      // ディレクトリの場合
      // 削除されることを考慮し、先に配下のディレクトリ、ファイルを再帰的に処理
      yield* this._toNextDeps(this._readFs, inputPath, params, inputRootPath, depth);
      if (isTarget && (!itemType || itemType === ITEM_TYPE.NODE)) {
        // ディレクトリ自身を返す
        yield {
          result: {
            inputItem,
            inputItemType: ITEM_TYPE.NODE,
            inputPath,
            inputRootPath,
          },
        };
      }
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
    params: IterationParams,
    inputRootPath: string = inputPath,
    depth: number = 0,
  ): InputGenerator<Content, FsInputResult> {
    const config = this._config;
    const { filter, itemType, ignoreSymlinks } = config;
    const isTarget = isMatch(inputPath, filter, params);

    const stat = await fsStat(inputPath, { ignoreSymlinks });
    if (stat.isDirectory()) {
      // ディレクトリの場合
      // 削除されることを考慮し、先に配下のディレクトリ、ファイルを再帰的に処理
      yield* this._toNextDeps(this._copyFs, inputPath, params, inputRootPath, depth);
      if (isTarget && (!itemType || itemType === ITEM_TYPE.NODE)) {
        // ディレクトリ自身を返す
        yield {
          result: {
            inputItem,
            inputItemType: ITEM_TYPE.NODE,
            inputPath,
            inputRootPath,
          },
        };
      }
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
    params: IterationParams,
    inputRootPath: string = inputPath,
    depth: number,
  ) {
    // 配下のディレクトリ、ファイルを再帰的に処理
    const config = this._config;
    const nextDepth = depth + 1;
    if (!config.ignoreSubDir || nextDepth === 1) {
      const items = await fs.readdir(inputPath);
      for (const item of items) {
        const itemPath = path.join(inputPath, item);
        // 子要素を処理
        try {
          yield* callback.call(this, itemPath, item, params, inputRootPath, nextDepth);
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
