import { Content, Optional } from '../types';
import isMatch from '../utils/isMatch';
import uuid from '../utils/uuid';
import { Manipulation, ManipulationConfigBase, OperationParams, OperationResult, OperationStatus } from './types';

export default abstract class ManipulationBase<C = Content, OC extends ManipulationConfigBase = ManipulationConfigBase>
  implements Manipulation<C>
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

  isManipulatable(content: C, params: OperationParams): boolean {
    const { disabled, filter } = this._config;
    if (disabled) {
      return false;
    } else if (!isMatch(content, filter, params)) {
      return false;
    }
    return true;
  }

  initialize(content: C, params: OperationParams): Promise<void> {
    return;
  }

  /**
   * コンテンツの操作
   * @param content
   * @param params
   */
  abstract manipulate(content: C, params: OperationParams): Promise<OperationResult<C>>;

  complete(content: C, params: OperationParams): Promise<void> {
    return;
  }
}
