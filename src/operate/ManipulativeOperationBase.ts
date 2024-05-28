import { OPERATION_STATUS, OPERATION_STATUS_PRIORITY } from '../constants';
import { Content, OperationResult, OperationStatus, Optional } from '../types';
import asArray from '../utils/asArray';
import throwError from '../utils/throwError';
import updateStatus from '../utils/updateStatus';
import OperationBase from './OperationBase';
import {
  Manipulation,
  ManipulationConfigBase,
  ManipulativeOperationConfig,
  OperationParams,
  TypedOperationConfig,
} from './types';

/**
 * ライブラリのインスタンスなどを利用した操作
 */
abstract class ManipulativeOperationBase<
  C extends Content = Content,
  OC extends TypedOperationConfig & ManipulativeOperationConfig = TypedOperationConfig & ManipulativeOperationConfig,
  I = C,
  M extends Manipulation = Manipulation<I>,
> extends OperationBase<C, OC> {
  /**
   * 操作
   */
  protected _manipulations: M[];

  protected _operationStatus: OperationStatus;

  constructor(config: Optional<OC, 'type'>) {
    super(config);
    this._construct();
    const { manipulations: manipulationConfigs } = this._config;
    const manipulations: M[] = [];
    for (const manipulationConfig of asArray(manipulationConfigs)) {
      manipulations.push(this._create(manipulationConfig));
    }
    this._manipulations = manipulations;
  }

  /**
   * インスタンス作成開始時の処理
   */
  protected _construct(): void {}

  /**
   * 操作のインスタンスを作成
   * @param config
   */
  protected _create(config: ManipulationConfigBase): M {
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
  protected abstract _createManipuration(config: ManipulationConfigBase): M | undefined;

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
    this._operationStatus = OPERATION_STATUS.UNPROCESSED;
    let currentInstance: I = await this._initialize(content, params);

    for (const manipulation of this._manipulations) {
      if (manipulation.isManipulatable(currentInstance, params)) {
        const result = await manipulation.manipulate(currentInstance, params);
        currentInstance = result.content;
        this._operationStatus = updateStatus(this._operationStatus, result.operationStatus, OPERATION_STATUS_PRIORITY);
      }
    }

    const currentContent = await this._complete(currentInstance, params);
    return { operationStatus: this._operationStatus, content: currentContent };
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
