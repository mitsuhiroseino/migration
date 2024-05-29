import { OPERATION_STATUS } from '../constants';
import { OperationResult, OperationStatus, Optional } from '../types';
import isMatch from '../utils/isMatch';
import uuid from '../utils/uuid';
import { Manipulation, ManipulationConfigBase, OperationParams } from './types';

export default abstract class ManipulationBase<I, OC extends ManipulationConfigBase = ManipulationConfigBase>
  implements Manipulation<I>
{
  protected _config: Optional<OC, 'type'>;

  private _manipulationId: string;

  constructor(config: Optional<OC, 'type'>) {
    this._config = config;
    this._manipulationId = config.manipulationId || uuid();
  }

  getManipulationId(): string {
    return this._manipulationId;
  }

  isManipulatable(instance: I, params: OperationParams): boolean {
    const { disabled, filter } = this._config;
    if (disabled) {
      return false;
    } else if (!isMatch(instance, filter, params)) {
      return false;
    }
    return true;
  }

  async setup(instance: I, params: OperationParams): Promise<OperationStatus> {
    return OPERATION_STATUS.UNPROCESSED;
  }

  /**
   * コンテンツの操作
   * @param instance
   * @param params
   */
  abstract manipulate(instance: I, params: OperationParams): Promise<OperationResult<I>>;

  async teardown(instance: I, params: OperationParams): Promise<OperationStatus> {
    return OPERATION_STATUS.UNPROCESSED;
  }
}
