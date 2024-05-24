import { Optional } from '../types';
import ManipulationBase from './ManipulationBase';
import {
  ManipulationAsyncFn,
  ManipulationConfigBase,
  ManipulationSyncFn,
  OperationParams,
  OperationResult,
  OperationStatus,
} from './types';

export default abstract class ManipulationBridgeBase<
  I,
  OC extends ManipulationConfigBase = ManipulationConfigBase,
> extends ManipulationBase<I, OC> {
  /**
   * 画像操作関数
   */
  private _manipulate: ManipulationAsyncFn<I> | ManipulationSyncFn<I>;

  constructor(manipulate: ManipulationAsyncFn<I> | ManipulationSyncFn<I>, config: Optional<OC, 'type'>) {
    super(config);
    this._manipulate = manipulate;
  }

  /**
   * コンテンツの操作
   * @param instance
   * @param params
   */
  async manipulate(instance: I, params: OperationParams): Promise<OperationResult<I>> {
    const result = this._manipulate(instance, this._config);
    if (result instanceof Promise) {
      const content = await result;
      return { status: this._getStatus(content, params), content };
    } else {
      return { status: this._getStatus(result, params), content: result };
    }
  }

  /**
   * 結果ステータスの取得
   * @param instance
   * @param params
   */
  protected abstract _getStatus(instance: I, params: OperationParams): OperationStatus;
}
