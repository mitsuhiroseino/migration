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
  M extends Manipulation<I> = Manipulation<I>,
> extends OperationBase<C, OC> {
  /**
   * 操作
   */
  protected _manipulations: M[];

  protected _operationStatus: OperationStatus;

  constructor(config: Optional<OC, 'type'>) {
    super(config);
  }

  async initialize(params: OperationParams): Promise<void> {
    const { manipulations: manipulationConfigs } = this._config;
    const manipulations: M[] = [];
    for (const manipulationConfig of asArray(manipulationConfigs)) {
      manipulations.push(this._create(manipulationConfig, params));
    }
    this._manipulations = manipulations;
  }

  /**
   * 操作のインスタンスを作成
   * @param config
   */
  protected _create(config: ManipulationConfigBase, params: OperationParams): M {
    const manipulation = this._createManipuration(config, params);
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
  protected abstract _createManipuration(config: ManipulationConfigBase, params: OperationParams): M | undefined;

  /**
   * 前処理
   * @param content
   * @param params
   * @returns
   */
  protected async _setup(content: C, params: OperationParams): Promise<OperationResult<I>> {
    this._operationStatus = OPERATION_STATUS.UNPROCESSED;
    const instance = await this._toInstance(content, params);
    const operationStatuses = await Promise.all(
      this._manipulations.map((manipulation) => manipulation.setup(instance, params)),
    );
    this._operationStatus = operationStatuses.reduce(
      (result, operationStatus) => updateStatus(result, operationStatus, OPERATION_STATUS_PRIORITY),
      this._operationStatus,
    );

    return {
      operationStatus: this._operationStatus,
      content: instance,
    };
  }

  protected async _toInstance(content: C, params: OperationParams): Promise<I> {
    return content as unknown as I;
  }

  async operate(content: C, params: OperationParams): Promise<OperationResult<C>> {
    const setupResult = await this._setup(content, params);
    let currentInstance = setupResult.content;

    for (const manipulation of this._manipulations) {
      if (manipulation.isManipulatable(currentInstance, params)) {
        const result = await manipulation.manipulate(currentInstance, params);
        currentInstance = result.content;
        this._operationStatus = updateStatus(this._operationStatus, result.operationStatus, OPERATION_STATUS_PRIORITY);
      }
    }

    const operationResult = await this._teardown(currentInstance, params);
    return operationResult;
  }

  /**
   * 後処理
   * @param instance
   * @param params
   * @returns
   */
  protected async _teardown(instance: I, params: OperationParams): Promise<OperationResult<C>> {
    const operationStatuses = await Promise.all(
      this._manipulations.map((manipulation) => manipulation.teardown(instance, params)),
    );
    this._operationStatus = operationStatuses.reduce(
      (result, operationStatus) => updateStatus(result, operationStatus, OPERATION_STATUS_PRIORITY),
      this._operationStatus,
    );
    const content = await this._toContent(instance, params);
    return { operationStatus: this._operationStatus, content };
  }

  protected async _toContent(instance: I, params: OperationParams): Promise<C> {
    return instance as unknown as C;
  }
}
export default ManipulativeOperationBase;
