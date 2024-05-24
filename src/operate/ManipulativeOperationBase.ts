import { Content, Optional } from '../types';
import asArray from '../utils/asArray';
import throwError from '../utils/throwError';
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
  I = C,
> extends OperationBase<C, OC> {
  /**
   * 操作
   */
  protected _manipulations: Manipulation<I>[];

  constructor(config: Optional<OC, 'type'>) {
    super(config);
    const { manipulations: manipulationConfigs } = this._config;
    const manipulations: Manipulation<I>[] = [];
    for (const manipulationConfig of asArray(manipulationConfigs)) {
      manipulations.push(this._create(manipulationConfig));
    }
    this._manipulations = manipulations;
  }

  /**
   * 操作のインスタンスを作成
   * @param config
   */
  protected _create(config: ManipulationConfigBase): Manipulation<I> {
    const manipulation = this._createManipuration(config);
    if (manipulation) {
      return manipulation;
    } else {
      throwError(`There was no manipulation "${config.type}".`, config);
    }
  }

  /**
   * 操作のインスタンスを作成
   * @param config
   */
  protected abstract _createManipuration(config: ManipulationConfigBase): Manipulation<I> | undefined;

  /**
   * 前処理
   * @param content
   * @param params
   * @param manipulations
   * @returns
   */
  protected async _initialize(content: C, params: OperationParams): Promise<I> {
    return content as unknown as I;
  }

  async operate(content: C, params: OperationParams): Promise<OperationResult<C>> {
    let currentInstance: I = await this._initialize(content, params);

    let status: OperationStatus = OPERATION_STATUS.UNCHANGED;
    for (const manipulation of this._manipulations) {
      if (manipulation.isManipulatable(currentInstance, params)) {
        const result = await manipulation.manipulate(currentInstance, params);
        currentInstance = result.content;
        const manipulationStatus = result.status;
        if (OPERATION_STATUS_PRIORITY[status] < OPERATION_STATUS_PRIORITY[manipulationStatus]) {
          status = manipulationStatus;
        }
      }
    }

    const currentContent = await this._complete(currentInstance, params);
    return { status, content: currentContent };
  }

  /**
   * 後処理
   * @param content
   * @param params
   * @param manipulations
   * @returns
   */
  protected async _complete(content: I, params: OperationParams): Promise<C> {
    return content as unknown as C;
  }
}
export default ManipulativeOperationBase;
