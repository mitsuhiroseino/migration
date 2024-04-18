import fs from 'fs-extra';
import path from 'path';
import { Content } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import writeAnyFile from '../../utils/writeAnyFile';
import writeBuffer from '../../utils/writeBuffer';
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
  const { outputPath, preserveOutputPath, paramName = '_resource', preserveParamName, ...rest } = config;

  // 出力パス
  const outputFilePath: string = finishDynamicValue(outputPath, params, {
    ...rest,
    preserveString: preserveOutputPath,
  });

  // パラメーター名
  const prmsName: string = finishDynamicValue(paramName, params, {
    ...rest,
    preserveString: preserveParamName,
  });

  // ファイルの出力
  const resource = params[prmsName];
  await writeAnyFile(outputFilePath, resource, rest);

  return content;
};
export default Output;
OperationFactory.register(OPERATION_TYPE.INPUT, Output);
