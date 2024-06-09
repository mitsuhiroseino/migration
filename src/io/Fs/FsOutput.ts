import fs from 'fs-extra';
import isString from 'lodash/isString';
import path from 'path';
import { ITEM_TYPE } from '../../constants';
import { Content, DiffParams, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import replacePlaceholders from '../../utils/replacePlaceholders';
import replaceWithConfigs from '../../utils/replaceWithConfigs';
import writeAnyFile from '../../utils/writeAnyFile';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { IO_TYPE } from '../constants';
import { OutputReturnValue } from '../types';
import { FsAssignedParams, FsOutputConfig, FsOutputResult } from './types';

/**
 * ファイルを出力する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class FsOutput extends OutputBase<Content, FsOutputConfig, FsOutputResult> {
  /**
   * アイテム名を取得する関数
   */
  private _getItemName: (outputItem: string, params: FsAssignedParams) => string;

  /**
   * コンストラクター
   * @param config
   */
  constructor(config: FsOutputConfig) {
    super(config);
    const { itemName } = config;
    this._getItemName = itemName
      ? isString(itemName)
        ? (outputItem, params) => replacePlaceholders(itemName, params, config)
        : (outputItem, params) => replaceWithConfigs(outputItem, itemName, params)
      : (outputItem) => outputItem;
  }

  async activate(params: IterationParams): Promise<DiffParams> {
    // 処理前に設定から作る情報を取得しておく
    const config = this._config;
    const { outputPath } = config;
    return {
      // 設定で指定されている出力先のファイル or ディレクトリのパス
      outputRootPath: path.normalize(finishDynamicValue(outputPath, params, config)),
    };
  }

  async start(params: IterationParams): Promise<DiffParams> {
    // 繰り返し毎に出力先の情報を作る
    return this._getOutputInfo(params);
  }

  /**
   * ファイルへの出力処理
   * @param content
   * @param params
   * @returns
   */
  protected async _write(content: any, params: FsAssignedParams): Promise<void> {
    const config = this._config;
    const { outputEncoding, ...rest } = config;
    const { _inputItemType = ITEM_TYPE.LEAF, _inputEncoding, _outputItemPath } = params;

    if (_inputItemType === ITEM_TYPE.NODE) {
      // ディレクトリの場合
      await fs.ensureDir(_outputItemPath);
    } else {
      // ファイルの場合
      let encoding = outputEncoding;
      if (!encoding) {
        // エンコーディングの指定が無い場合は入力時のエンコーディングで出力
        encoding = _inputEncoding;
      }
      await writeAnyFile(_outputItemPath, content, {
        encoding,
        ...rest,
        ensured: false,
      });
    }
  }

  /**
   * ファイルのコピー
   * @param content
   * @param params
   * @returns
   */
  protected async _copy(params: FsAssignedParams): Promise<void> {
    const { _inputItemPath, _outputItemPath, _outputParentPath } = params;

    await fs.ensureDir(_outputParentPath);
    await fs.copy(_inputItemPath, _outputItemPath, {});
  }

  /**
   * ファイルの移動
   * @param content
   * @param params
   * @returns
   */
  protected async _move(params: FsAssignedParams): Promise<void> {
    const { _inputItemPath, _outputItemPath, _outputParentPath } = params;

    await fs.ensureDir(_outputParentPath);
    await fs.move(_inputItemPath, _outputItemPath, {});
  }

  /**
   * 出力先の情報を取得する
   * @param params
   * @param removeExtensions
   * @returns
   */
  private _getOutputInfo(params: FsAssignedParams): FsOutputResult {
    const { _inputItemPath, _inputRootPath, _inputItem, _outputRootPath } = params;

    // 出力の親ディレクトリパス
    let outputParentPath: string;
    // 出力するアイテムの名称
    let outputItem: string;
    if (_inputRootPath == null && _inputItemPath == null) {
      // 入力はパスを持たない
      outputParentPath = _outputRootPath;
      outputItem = _inputItem;
    } else if (_inputRootPath == null || _inputRootPath === _inputItemPath) {
      // 入力はパスを持つ & (ルートが無い or ルートに対する処理)
      // 出力の親ディレクトリパス＝出力のルートの親ディレクトリのパス
      outputParentPath = path.dirname(_outputRootPath);
      outputItem = path.basename(_outputRootPath);
    } else {
      // 入力はパスを持つ & 配下に対する処理
      // 出力の親ディレクトリパス＝出力のルートのパス
      const inputParentRelativePath = path.relative(_inputRootPath, path.dirname(_inputItemPath));
      outputParentPath = path.join(_outputRootPath, inputParentRelativePath);
      outputItem = _inputItem;
    }
    // itemNameの変換がある場合は既定のoutputItemを基に変換する
    outputItem = this._getItemName(outputItem, params);

    const outputItemPath: string = outputItem != null ? path.join(outputParentPath, outputItem) : outputParentPath;

    return {
      // 現在処理中の出力先のファイル or ディレクトリのパス
      outputItemPath,
      // 現在処理中の出力先のファイル or ディレクトリの名称
      outputItem,
      // 現在処理中の出力先のファイル or ディレクトリの親ディレクトリのパス
      outputParentPath,
    };
  }
}

OutputFactory.register(IO_TYPE.FS, FsOutput);
export default FsOutput;
