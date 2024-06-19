import { Content, OperationResult } from '../../types';
import isMatch from '../../utils/isMatch';
import toOperations from '../../utils/toOperations';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import operate from '../operate';
import { Operation, OperationParams } from '../types';
import { IfConfig } from './types';

/**
 * 条件に応じて処理を切り替える操作
 */
class If extends OperationBase<Content, IfConfig> {
  private _then: Operation[];
  private _else: Operation[];

  constructor(config: IfConfig) {
    super(config);
    this._then = toOperations(config.then, config);
    this._else = toOperations(config.else, config);
  }

  protected async _operate(content: Content, params: OperationParams): Promise<OperationResult<Content>> {
    const { condition } = this._config;
    let operations;
    if (isMatch(content, condition, params)) {
      operations = this._then;
    } else {
      operations = this._else;
    }
    return await operate(content, operations, params);
  }
}

export default If;
OperationFactory.register(OPERATION_TYPE.IF, If);
