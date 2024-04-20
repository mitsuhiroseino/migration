import fs from 'fs-extra';
import path from 'path';
import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import replaceWithConfigs from '../../../utils/replaceWithConfigs';
import writeAnyFile from '../../../utils/writeAnyFile';
import { IO_TYPE } from '../../constants';
import OutputBase from '../OutputBase';
import OutputFactory from '../OutputFactory';
import { OutputReturnValue } from '../types';
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

  constructor(config: FsOutputConfig) {
    super(config);
    const { itemName } = config;
    this._getItemName = itemName
      ? (outputItem, params) => replaceWithConfigs(outputItem, itemName, params)
      : (outputItem) => outputItem;
  }

  async write(content: any, params: FsAssignedParams): Promise<OutputReturnValue<FsOutputResult>> {
    const config = this._config;
    const { outputEncoding, ...rest } = config;
    const { outputItemPath, outputRootPath, outputItem } = this._getOutputInfo(params);
    const { _inputPath: _inputItemPath, _inputItemType, _inputEncoding } = params;

    if (_inputItemType === ITEM_TYPE.NODE) {
      // ディレクトリの場合
      await fs.ensureDir(outputItemPath);
    } else {
      // ファイルの場合
      let encoding = outputEncoding;
      if (!encoding) {
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

  async copy(content: any, params: FsAssignedParams): Promise<OutputReturnValue<FsOutputResult>> {
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

  private _getOutputInfo(params: FsAssignedParams) {
    const config = this._config;
    const { outputPath } = config;
    const { _inputPath: _inputItemPath, _inputRootPath, _inputItem } = params;
    const inputParentRelativePath = path.relative(_inputRootPath, path.dirname(_inputItemPath));
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
