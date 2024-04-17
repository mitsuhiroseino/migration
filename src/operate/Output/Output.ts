import fs from 'fs-extra';
import path from 'path';
import { Content } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import writeFile from '../../utils/writeFile';
import writeText from '../../utils/writeText';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import { OutputConfig } from './types';

/**
 * ファイルを出力する操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Output: Operation<Content, OutputConfig> = async (content, config, params) => {
  const {
    outputPath,
    preserveOutputPath,
    paramName = '_resource',
    preserveParamName,
    binary,
    encoding,
    ...rest
  } = config;

  // 出力パス
  const outputFilePath: string = finishDynamicValue(outputPath, params, {
    ...rest,
    preserveString: preserveOutputPath,
  });
  // フォルダを作成
  const parentPath = path.dirname(outputFilePath);
  await fs.ensureDir(parentPath);

  // パラメーター名
  const prmsName: string = finishDynamicValue(paramName, params, {
    ...rest,
    preserveString: preserveParamName,
  });

  // ファイルの出力
  const resource = params[prmsName];
  if (binary) {
    await writeFile(outputFilePath, resource);
  } else {
    await writeText(outputFilePath, resource, { encoding });
  }

  return content;
};
export default Output;
OperationFactory.register(OPERATION_TYPE.INPUT, Output);
