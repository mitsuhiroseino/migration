import fs from 'fs-extra';
import isString from 'lodash/isString';
import path from 'path';
import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import replacePlaceholders from '../../../utils/replacePlaceholders';
import replaceWithConfigs from '../../../utils/replaceWithConfigs';
import writeAnyFile from '../../../utils/writeAnyFile';
import { IO_TYPE } from '../../constants';
import { OutputReturnValue } from '../../types';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { FsAssignedParams, FsOutputConfig, FsOutputResult } from './types';

/**
 * ファイルを出力する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
class Fs extends OutputBase<Content, FsOutputConfig, FsOutputResult> {
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

  /**
   * ファイルへの出力処理
   * @param content
   * @param params
   * @returns
   */
  async write(content: any, params: FsAssignedParams): Promise<OutputReturnValue<FsOutputResult>> {
    const config = this._config;
    const { outputEncoding, ...rest } = config;
    const { outputItemPath, outputRootPath, outputItem } = this._getOutputInfo(params);
    const { _inputItemType, _inputEncoding } = params;

    if (_inputItemType === ITEM_TYPE.NODE) {
      // ディレクトリの場合
      await fs.ensureDir(outputItemPath);
    } else {
      // ファイルの場合
      let encoding = outputEncoding;
      if (!encoding) {
        // エンコーディングの指定が無い場合は入力時のエンコーディングで出力
        encoding = _inputEncoding;
      }
      await writeAnyFile(outputItemPath, content, {
        encoding,
        ...rest,
        ensured: false,
      });
    }

    return {
      status: MIGRATION_ITEM_STATUS.CONVERTED,
      result: { outputItem, outputPath: outputItemPath, outputRootPath },
    };
  }

  /**
   * ファイルのコピー
   * @param content
   * @param params
   * @returns
   */
  async copy(params: FsAssignedParams): Promise<OutputReturnValue<FsOutputResult>> {
    const { outputItemPath, outputRootPath, outputParentPath, outputItem } = this._getOutputInfo(params);
    const { _inputPath: _inputItemPath, _inputItemType } = params;

    if (_inputItemType === ITEM_TYPE.NODE) {
      // ディレクトリの場合
      await fs.ensureDir(outputItemPath);
    } else {
      // ファイルの場合
      await fs.ensureDir(outputParentPath);
      await fs.copyFile(_inputItemPath, outputItemPath);
    }

    return {
      status: MIGRATION_ITEM_STATUS.COPIED,
      result: { outputItem, outputPath: outputItemPath, outputRootPath },
    };
  }

  /**
   * ファイルの移動
   * @param content
   * @param params
   * @returns
   */
  async move(params: FsAssignedParams): Promise<OutputReturnValue<FsOutputResult>> {
    const { outputItemPath, outputRootPath, outputParentPath, outputItem } = this._getOutputInfo(params);
    const { _inputPath: _inputItemPath, _inputItemType } = params;

    if (_inputItemType === ITEM_TYPE.NODE) {
      // ディレクトリの場合
      await fs.ensureDir(outputItemPath);
    } else {
      // ファイルの場合
      await fs.ensureDir(outputParentPath);
      await fs.move(_inputItemPath, outputItemPath);
    }

    return {
      status: MIGRATION_ITEM_STATUS.COPIED,
      result: { outputItem, outputPath: outputItemPath, outputRootPath },
    };
  }

  /**
   * 出力先の情報を取得する
   * @param params
   * @param removeExtensions
   * @returns
   */
  private _getOutputInfo(params: FsAssignedParams) {
    const config = this._config;
    const { outputPath } = config;
    const { _inputPath: _inputItemPath, _inputRootPath, _inputItem } = params;
    const isRoot = _inputRootPath === _inputItemPath;

    // 出力先のルートパスは設定から取得
    const outputRootPath: string = path.normalize(finishDynamicValue(outputPath, params, config));
    // 出力の親ディレクトリパス
    let outputParentPath: string;
    // 出力するアイテムの名称
    let outputItem: string;
    if (isRoot) {
      // ルートに対する処理
      // 出力の親ディレクトリパス＝出力のルートの親ディレクトリのパス
      outputParentPath = path.dirname(outputRootPath);
      outputItem = path.basename(outputRootPath);
    } else {
      // 配下に対する処理
      // 出力の親ディレクトリパス＝出力のルートのパス
      const inputParentRelativePath = path.relative(_inputRootPath, path.dirname(_inputItemPath));
      outputParentPath = path.join(outputRootPath, inputParentRelativePath);
      outputItem = _inputItem;
    }
    // itemNameの変換がある場合は既定のoutputItemを基に変換する
    outputItem = this._getItemName(outputItem, params);

    const outputItemPath: string = path.join(outputParentPath, outputItem);

    return {
      outputItemPath,
      outputRootPath,
      outputParentPath,
      outputItem,
    };
  }
}

OutputFactory.register(IO_TYPE.FS, Fs);
export default Fs;
