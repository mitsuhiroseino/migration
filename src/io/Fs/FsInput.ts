import fs from 'fs-extra';
import path from 'path';
import { ReplaceOptions } from 'src/utils/replace';
import { CONTENT_TYPE, ITEM_TYPE } from '../../constants';
import { Content, ContentType, DiffParams, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import fsStat from '../../utils/fsStat';
import getEncoding from '../../utils/getEncoding';
import isMatch from '../../utils/isMatch';
import readAnyFile from '../../utils/readAnyFile';
import removeExtension from '../../utils/removeExtension';
import throwError from '../../utils/throwError';
import toString from '../../utils/toString';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputGenerator, InputReturnValue, PathInputResultBase } from '../types';
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
class FsInput extends InputBase<Content, FsInputConfig, FsInputResult> {
  /**
   * 削除するディレクトリのパス
   */
  private _dirsToDelete: string[];

  async activate(params: IterationParams): Promise<DiffParams> {
    this._dirsToDelete = [];
    return {};
  }

  /**
   * ファイル・ディレクトリの読み込み
   * @param params
   * @returns
   */
  read(params: IterationParams): AsyncIterableIterator<InputReturnValue<any, PathInputResultBase>> {
    return this._generateFs(this._readFs, params);
  }

  /**
   * ファイル・ディレクトリのコピー
   * @param params
   * @returns
   */
  copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<any, PathInputResultBase>> {
    return this._generateFsInputResult(params);
  }

  /**
   * ファイル・ディレクトリの移動
   * @param params
   * @returns
   */
  move(params: IterationParams): AsyncIterableIterator<InputReturnValue<any, PathInputResultBase>> {
    return this._generateFsInputResult(params);
  }

  async delete(params: IterationParams): Promise<DiffParams> {
    if (!this._config.dryRun) {
      const _inputPath = params._inputPath as string;
      if (params._inputItemType === ITEM_TYPE.LEAF) {
        // ファイルは即削除
        await fs.remove(_inputPath);
      } else {
        // ディレクトリは削除対象のパスを保持
        this._dirsToDelete.push(_inputPath);
      }
    }
    return {};
  }

  async deactivate(params: IterationParams): Promise<DiffParams> {
    // ディレクトリを削除する
    if (!this._config.dryRun) {
      for (const dirPath of this._dirsToDelete) {
        // 確実に処理を行うために同期処理
        if (fs.existsSync(dirPath)) {
          fs.removeSync(dirPath);
        }
      }
    }
    return {};
  }

  /**
   * 指定のパス配下のファイルを読み込むジェネレーター
   * @param callback read or copy
   * @param config 入力設定
   * @param params 1繰り返し毎のパラメーター
   */
  private async *_generateFs(callback: CallbackFn, params: IterationParams): InputGenerator<Content, FsInputResult> {
    const rootPath: string = this._getRootPath(params);
    const availablePath = await fs.exists(rootPath);
    if (availablePath) {
      // ファイルの読み込み
      yield* callback.call(this, rootPath, path.basename(rootPath), params);
    } else {
      const config = this._config;
      if (!config.skipIfNoInput) {
        throwError(`"${rootPath}" does not exist.`, config);
      }
    }
  }

  private _getRootPath(params: IterationParams): string {
    const config = this._config;
    const { inputPath } = config;
    const rootPath: string = path.normalize(finishDynamicValue(inputPath, params, config));
    return rootPath;
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
    const { filter, itemType = ITEM_TYPE.LEAF, ignoreSymlinks } = config;
    const isTarget = isMatch(inputPath, filter, params);

    const stat = await fsStat(inputPath, { ignoreSymlinks });
    if (stat.isDirectory()) {
      // ディレクトリの場合
      if (isTarget && (itemType === ITEM_TYPE.ANY || itemType === ITEM_TYPE.NODE)) {
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
      // 配下のディレクトリ、ファイルを再帰的に処理
      yield* this._toNextDeps(this._readFs, inputPath, params, inputRootPath, depth);
    } else if (stat.isFile()) {
      // ファイルの場合
      if (isTarget && (itemType === ITEM_TYPE.ANY || itemType === ITEM_TYPE.LEAF)) {
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
    return {
      inputItem: tidyInputItem,
      inputPath,
      inputRootPath,
    };
  }

  /**
   * 複写、移動用の結果を返すジェネレーター
   * @param params
   */
  private async *_generateFsInputResult(params: IterationParams): InputGenerator<Content, FsInputResult> {
    const rootPath: string = this._getRootPath(params);
    const stats = await fsStat(rootPath);
    if (stats) {
      yield {
        result: {
          inputItem: path.basename(rootPath),
          inputItemType: stats.isFile() ? ITEM_TYPE.LEAF : ITEM_TYPE.NODE,
          inputPath: rootPath,
          inputRootPath: rootPath,
        },
      };
    } else {
      const config = this._config;
      if (!config.skipIfNoInput) {
        throwError(`"${rootPath}" does not exist.`, config);
      }
    }
  }
}
InputFactory.register(IO_TYPE.FS, FsInput);
export default FsInput;
