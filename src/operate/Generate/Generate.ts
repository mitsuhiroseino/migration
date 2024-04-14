import Handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import { CONTENT_TYPE } from '../../constants';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation, OperationParams } from '../types';
import { GenerateConfig } from './types';

helpers();

/**
 * テンプレートエンジンを使用した生成の操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Generate: Operation<string, GenerateConfig> = async (
  content: string,
  config: GenerateConfig,
  params: OperationParams,
) => {
  let { operationId: opeId, type, filter, ...compileOptions } = config;
  const template = Handlebars.compile(content, compileOptions);
  // 実行
  return template(params);
};
export default Generate;
OperationFactory.register(OPERATION_TYPE.GENERATE, Generate, CONTENT_TYPE.TEXT);
