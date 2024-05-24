import { Content, Optional } from '../types';
import asArray from '../utils/asArray';
import OperationBase from './OperationBase';
import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY } from './constants';
import {
  Manipulation,
  ManipulationConfigBase,
  ManipulativeOperationConfig,
  OperationParams,
  OperationResult,
  OperationStatus,
  TypedOperationConfig,
} from './types';

/**
 * ライブラリのインスタンスなどを利用した操作
 */
abstract class ManipulativeOperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig & ManipulativeOperationConfig = TypedOperationConfig & ManipulativeOperationConfig,
> extends OperationBase<C, OC> {
  /**
   * 操作
   */
  protected _manipulations: Manipulation<C>[];

  constructor(config: Optional<OC, 'type'>) {
    super(config);
    const { manipulations: manipulationConfigs } = this._config;
    const manipulations: Manipulation<C>[] = [];
    for (const manipulationConfig of asArray(manipulationConfigs)) {
      manipulations.push(this._createManipuration(manipulationConfig));
    }
    this._manipulations = manipulations;
  }

  /**
   * 操作のインスタンスを作成
   * @param config
   */
  protected abstract _createManipuration(config: ManipulationConfigBase): Manipulation<C>;

  /**
   * 前処理
   * @param manipulations
   * @param content
   * @param params
   * @returns
   */
  protected _initialize(manipulations: Manipulation<C>[], content: C, params: OperationParams): Promise<void> {
    return;
  }

  async operate(content: C, params: OperationParams): Promise<OperationResult<C>> {
    await this._initialize(this._manipulations, content, params);

    let status: OperationStatus = OPERATION_STATUS.UNCHANGED;
    let currentContent = content;
    for (const manipulation of this._manipulations) {
      if (manipulation.isManipulatable(currentContent, params)) {
        const result = await manipulation.manipulate(currentContent, params);
        currentContent = result.content;
        const manipulationStatus = result.status;
        if (OPERATION_STATUS_PRIORITY[status] < OPERATION_STATUS_PRIORITY[manipulationStatus]) {
          status = manipulationStatus;
        }
      }
    }

    await this._complete(this._manipulations, content, params);
    return { status, content: currentContent };
  }

  /**
   * 後処理
   * @param manipulations
   * @param content
   * @param params
   * @returns
   */
  protected _complete(manipulations: Manipulation<C>[], content: C, params: OperationParams): Promise<void> {
    return;
  }
}
export default ManipulativeOperationBase;
