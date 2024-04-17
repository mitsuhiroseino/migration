import fs from 'fs-extra';
import path from 'path';
import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import replaceWithConfigs from '../../../utils/replaceWithConfigs';
import writeAnyFile from '../../../utils/writeAnyFile';
import OutputFactory from '../OutputFactory';
import { OUTPUT_TYPE } from '../constants';
import { Output, OutputReturnValue } from '../types';
import { FileAssignedParams, FileOutputConfig, FileOutputResult } from './types';

/**
 * スケルトンを基にコンテンツを生成する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const File: Output<Content, FileOutputConfig, FileOutputResult, FileAssignedParams> = function (config) {
  const processedDirs: { [dir: string]: boolean } = {};
  const { outputPath, outputEncoding, outputBinary, itemName, copy, ...rest } = config;
  const getItemName = itemName
    ? (_inputItem, params) => replaceWithConfigs(_inputItem, itemName, params)
    : (_inputItem) => _inputItem;

  return async (content: Content, params: FileAssignedParams): Promise<OutputReturnValue<FileOutputResult>> => {
    const {
      _inputPath: inputItemPath,
      _inputItem,
      _inputParentRelativePath,
      _inputItemType,
      _inputEncoding,
      _isNew,
    } = params;
    const status = _isNew ? MIGRATION_ITEM_STATUS.CREATED : MIGRATION_ITEM_STATUS.CONVERTED;

    const outputRootPath: string = finishDynamicValue(outputPath, params, config);
    let outputParentPath: string;
    let outputItem: string;
    let outputItemPath: string;

    if (_inputParentRelativePath) {
      // 入力がツリー形式
      outputParentPath = path.join(outputRootPath, _inputParentRelativePath);
      // 出力先の名称を取得
      outputItem = getItemName(_inputItem, params);
      outputItemPath = path.join(outputParentPath, outputItem);
    } else {
      // 入力の構成が不明
      if (_inputItem) {
        // フラットな構成のものをファイル出力する場合
        outputItem = getItemName(_inputItem, params);
        outputItemPath = path.join(outputRootPath, outputItem);
        outputParentPath = outputRootPath;
      } else {
        // Boilerplateはこちら
        outputItemPath = outputRootPath;
        outputParentPath = path.dirname(outputRootPath);
      }
    }

    let ensured = false;
    if (outputParentPath in processedDirs) {
      // これまでに親ディレクトリの扱いなし
      processedDirs[outputParentPath] = true;
    } else {
      // これまでに親ディレクトリの扱いあり
      ensured = true;
    }

    if (_inputItemType === ITEM_TYPE.LEAF) {
      // ファイルの場合
      if (copy) {
        // コピー
        if (!ensured) {
          await fs.ensureDir(outputParentPath);
        }
        await fs.copyFile(inputItemPath, outputItemPath);
      } else {
        // 出力
        await writeAnyFile(outputItemPath, content, {
          encoding: outputEncoding || _inputEncoding,
          binary: outputBinary,
          ...rest,
          ensured,
        });
        return {
          status,
          result: { outputPath: outputItemPath, outputParentPath, outputItem },
        };
      }
    } else {
      // ディレクトリの場合
      await fs.ensureDir(outputItemPath);
      processedDirs[outputParentPath] = true;
      return {
        status,
        result: { outputPath: outputItemPath, outputParentPath, outputItem },
      };
    }
  };
};
OutputFactory.register(OUTPUT_TYPE.FILE, File);
export default File;
