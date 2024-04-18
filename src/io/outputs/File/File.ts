import fs from 'fs-extra';
import path from 'path';
import { ITEM_TYPE, MIGRATION_ITEM_STATUS } from '../../../constants';
import { Content } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import replaceWithConfigs from '../../../utils/replaceWithConfigs';
import writeAnyFile from '../../../utils/writeAnyFile';
import { IO_TYPE } from '../../constants';
import OutputFactory from '../OutputFactory';
import { Output, OutputReturnValue } from '../types';
import { FileAssignedParams, FileOutputConfig, FileOutputResult } from './types';

/**
 * スケルトンを基にコンテンツを生成する
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const File: Output<Content, FileOutputConfig, FileOutputResult, FileAssignedParams> = function (config) {
  const { outputPath, outputEncoding, outputBinary, itemName, copy, ...rest } = config;
  const getItemName = itemName
    ? (outputItem, params) => replaceWithConfigs(outputItem, itemName, params)
    : (outputItem) => outputItem;

  return async (content: Content, params: FileAssignedParams): Promise<OutputReturnValue<FileOutputResult>> => {
    const {
      _inputPath: _inputItemPath,
      _inputRootPath,
      _inputItem,
      _inputParentRelativePath,
      _inputItemType,
      _inputEncoding,
      _isNew,
    } = params;
    const status = _isNew ? MIGRATION_ITEM_STATUS.CREATED : MIGRATION_ITEM_STATUS.CONVERTED;
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
      outputParentPath = path.join(outputRootPath, _inputParentRelativePath);
      outputItem = _inputItem;
    }
    // itemNameの変換がある場合は既定のoutputItemを基に変換する
    outputItem = getItemName(outputItem, params);

    let outputItemPath: string = path.join(outputParentPath, outputItem);

    if (_inputItemType === ITEM_TYPE.LEAF) {
      // ファイルの場合
      if (copy) {
        // コピー
        await fs.ensureDir(outputParentPath);
        await fs.copyFile(_inputItemPath, outputItemPath);
      } else {
        // 出力
        await writeAnyFile(outputItemPath, content, {
          encoding: outputEncoding || _inputEncoding,
          binary: outputBinary,
          ...rest,
          ensured: false,
        });
        return {
          status,
          result: { outputPath: outputItemPath, outputParentPath, outputItem },
        };
      }
    } else {
      // ディレクトリの場合
      await fs.ensureDir(outputItemPath);
      return {
        status,
        result: { outputPath: outputItemPath, outputParentPath, outputItem },
      };
    }
  };
};
OutputFactory.register(IO_TYPE.FILE, File);
export default File;
