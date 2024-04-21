import Handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import { CONTENT_TYPE } from '../../constants';
import Context from '../../utils/Context';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import { GenerateConfig } from './types';

helpers();

/**
 * テンプレートエンジンを使用した生成の操作
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Generate: Operation<string, GenerateConfig> = async (content, config, params) => {
  let { operationId, type, filter, ...compileOptions } = config;
  let template = Context.get(config);
  if (!template) {
    template = Handlebars.compile(content, compileOptions);
    Context.set(config, template);
  }
  // 実行
  return template(params);
};
export default Generate;
OperationFactory.register(OPERATION_TYPE.GENERATE, Generate, CONTENT_TYPE.TEXT);
