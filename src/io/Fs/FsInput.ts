import fs from 'fs-extra';
import path from 'path';
import { CONTENT_TYPE, ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../constants';
import { Content, ContentType, DiffParams, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import fsStat from '../../utils/fsStat';
import getEncoding from '../../utils/getEncoding';
import isMatch from '../../utils/isMatch';
import readAnyFile from '../../utils/readAnyFile';
import removeExtension from '../../utils/removeExtension';
import toString from '../../utils/toString';
import InputBase from '../InputBase';
import InputFactory from '../InputFactory';
import { IO_TYPE } from '../constants';
import { InputGenerator, InputReturnValue, PathInputResultBase } from '../types';
import { FsAssignedParams, FsInputConfig, FsInputResult } from './types';

type CallbackFn = (
  inputItemPath: string,
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

  protected async _activate(params: FsAssignedParams): Promise<DiffParams> {
    this._dirsToDelete = [];
    // 処理前に設定から作る情報を取得しておく
    const config = this._config;
    const { inputPath } = config;
    return {
      // 設定で指定されている入力元のファイル or ディレクトリのパス
      inputRootPath: path.normalize(finishDynamicValue(inputPath, params, config)),
    };
  }

  /**
   * ファイル・ディレクトリの読み込み
   * @param params
   * @returns
   */
  protected _read(params: FsAssignedParams): AsyncIterableIterator<InputReturnValue<any, PathInputResultBase>> {
    return this._generateFs(this._readFs, params);
  }

  /**
   * ファイル・ディレクトリのコピー
   * @param params
   * @returns
   */
  protected _copy(params: FsAssignedParams): AsyncIterableIterator<InputReturnValue<any, PathInputResultBase>> {
    return this._generateFsInputResult(params);
  }

  /**
   * ファイル・ディレクトリの移動
   * @param params
   * @returns
   */
  protected _move(params: FsAssignedParams): AsyncIterableIterator<InputReturnValue<any, PathInputResultBase>> {
    return this._generateFsInputResult(params);
  }

  protected async _delete(content: Content, params: FsAssignedParams): Promise<void> {
    const { _inputItemPath, _inputItemType } = params;
    if (_inputItemType === ITEM_TYPE.LEAF) {
      // ファイルは即削除
      await fs.remove(_inputItemPath);
    } else {
      // ディレクトリは削除対象のパスを保持
      this._dirsToDelete.push(_inputItemPath);
    }
  }

  protected async _deactivate(params: FsAssignedParams): Promise<void> {
    // ディレクトリを削除する
    for (const dirPath of this._dirsToDelete) {
      // 確実に処理を行うために同期処理
      if (fs.existsSync(dirPath)) {
        fs.removeSync(dirPath);
      }
    }
  }

  /**
   * 指定のパス配下のファイルを読み込むジェネレーター
   * @param callback read or copy
   * @param config 入力設定
   * @param params 1繰り返し毎のパラメーター
   */
  private async *_generateFs(callback: CallbackFn, params: FsAssignedParams): InputGenerator<Content, FsInputResult> {
    const inputRootPath: string = params._inputRootPath;
    const availablePath = await fs.exists(inputRootPath);
    if (availablePath) {
      // ファイルの読み込み
      yield* callback.call(this, inputRootPath, path.basename(inputRootPath), params);
    } else {
      // 対象が無い場合
      yield this._handleNotFound(`"${inputRootPath}" does not exist.`);
    }
  }

  /**
   * 指定のパス配下のファイルを読み込む関数
   * @param inputItemPath 入力対象のパス
   * @param inputItem ファイル・ディレクトリ名
   * @param config コンフィグ
   * @param params 1繰り返し毎のパラメーター
   * @param inputRootPath ルートのパス
   * @param depth ルートからの深さ
   */
  private async *_readFs(
    inputItemPath: string,
    inputItem: string,
    params: FsAssignedParams,
    inputRootPath: string = inputItemPath, // 初回はルートパス＝処理対象の要素のパス
    depth: number = 0,
  ): InputGenerator<Content, FsInputResult> {
    const config = this._config;
    const { itemType = ITEM_TYPE.LEAF, filter, filterTarget = ITEM_TYPE.LEAF, ignoreSymlinks } = config;
    const stat = await fsStat(inputItemPath, { ignoreSymlinks });
    const isTarget = isMatch(inputItemPath, filter, params);

    if (stat.isDirectory()) {
      // ディレクトリの場合
      const isYieldTarget = itemType === ITEM_TYPE.ANY || itemType === ITEM_TYPE.NODE;
      const isFilterTarget = filterTarget === ITEM_TYPE.ANY || filterTarget === ITEM_TYPE.NODE;
      // NODEが取得対象 and (NODEはフィルタリング対象ではない or フィルタリングされなかった)
      if (isYieldTarget && (!isFilterTarget || isTarget)) {
        // ディレクトリ自身を返す
        yield {
          status: MIGRATION_ITEM_STATUS.PROCESSED,
          result: {
            inputItemPath,
            inputItem,
            inputItemType: ITEM_TYPE.NODE,
            inputRootPath,
          },
        };
      }
      // 配下のディレクトリ、ファイルを再帰的に処理
      yield* this._toNextDeps(this._readFs, inputItemPath, params, inputRootPath, depth);
    } else if (stat.isFile()) {
      // ファイルの場合
      const isYieldTarget = itemType === ITEM_TYPE.ANY || itemType === ITEM_TYPE.LEAF;
      const isFilterTarget = filterTarget === ITEM_TYPE.ANY || filterTarget === ITEM_TYPE.LEAF;
      // LEAFが取得対象 and (LEAFはフィルタリング対象ではない or フィルタリングされなかった)
      if (isYieldTarget && (!isFilterTarget || isTarget)) {
        // ファイルを読み込んで返す
        const { inputEncoding, removeExtensions } = config;
        // ファイルの入力
        const buffer: Buffer = await readAnyFile(inputItemPath, { encoding: 'binary' });
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
          status: MIGRATION_ITEM_STATUS.PROCESSED,
          content,
          result: {
            inputItemPath,
            inputItem: removeExtension(inputItem, removeExtensions),
            inputItemType: ITEM_TYPE.LEAF,
            inputContentType,
            inputEncoding: encoding,
            inputRootPath,
          },
        };
      }
    }
  }

  private async *_toNextDeps(
    callback: CallbackFn,
    inputDirPath: string,
    params: FsAssignedParams,
    inputRootPath: string = inputDirPath,
    depth: number,
  ) {
    // 配下のディレクトリ、ファイルを再帰的に処理
    const config = this._config;
    const nextDepth = depth + 1;
    if (!config.ignoreSubDir || nextDepth === 1) {
      const items = await fs.readdir(inputDirPath);
      for (const item of items) {
        const inputItemPath = path.join(inputDirPath, item);
        // 子要素を処理
        try {
          yield* callback.call(this, inputItemPath, item, params, inputRootPath, nextDepth);
        } catch (error) {
          throw error;
        }
      }
    }
  }

  /**
   * 複写、移動用の結果を返すジェネレーター
   * @param params
   */
  private async *_generateFsInputResult(params: FsAssignedParams): InputGenerator<Content, FsInputResult> {
    const inputRootPath: string = params._inputRootPath;
    const stats = await fsStat(inputRootPath);
    const result: FsInputResult = {
      // コピー・移動はルートパス＝処理対象の要素のパス
      inputItemPath: inputRootPath,
      inputItem: path.basename(inputRootPath),
      inputRootPath,
    };
    if (stats) {
      yield {
        status: MIGRATION_ITEM_STATUS.PROCESSED,
        result: {
          ...result,
          inputItemType: stats.isFile() ? ITEM_TYPE.LEAF : ITEM_TYPE.NODE,
        },
      };
    } else {
      // 対象が無い場合
      yield this._handleNotFound(`"${inputRootPath}" does not exist.`, result);
    }
  }
}
InputFactory.register(IO_TYPE.FS, FsInput);
export default FsInput;
