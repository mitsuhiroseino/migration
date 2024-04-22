import Handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import { CONTENT_TYPE } from '../../constants';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import { GenerateConfig } from './types';

helpers();

/**
 * テンプレートエンジンを使用した生成の操作
 */
class Generate extends OperationBase<string, GenerateConfig> {
  readonly contentTypes = CONTENT_TYPE.TEXT;

  private _templates: Record<string, ReturnType<typeof Handlebars.compile>> = {};

  async operate(content: string, params: OperationParams): Promise<string> {
    const { operationId, type, filter, ...compileOptions } = this._config;
    let template = this._templates[content];
    if (!template) {
      template = this._templates[content] = Handlebars.compile(content, compileOptions);
    }
    // 実行
    return template(params);
  }
}
export default Generate;
OperationFactory.register(OPERATION_TYPE.GENERATE, Generate);
