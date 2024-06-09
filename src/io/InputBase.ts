import { Content, DiffParams, IterationParams } from '../types';
import IoBase from './IoBase';
import { Input, InputConfigBase, InputResultBase, InputReturnValue } from './types';

/**
 * 入力の基底クラス
 */
abstract class InputBase<
    C extends Content,
    IC extends InputConfigBase = InputConfigBase,
    IR extends InputResultBase = InputResultBase,
  >
  extends IoBase<IC>
  implements Input<C, IR>
{
  /**
   * 削除結果
   */
  protected _deleteResult: DiffParams;

  read(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>> {
    return this._read(params);
  }

  /**
   * 種別固有のコンテンツの入力
   * @param params
   */
  protected abstract _read(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>> {
    return this._copy(params);
  }

  /**
   * 種別固有のコンテンツのコピー
   * @param params
   */
  protected abstract _copy(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  move(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>> {
    return this._move(params);
  }

  /**
   * 種別固有のコンテンツの移動
   * @param params
   */
  protected abstract _move(params: IterationParams): AsyncIterableIterator<InputReturnValue<C, IR>>;

  async delete(content: C, params: IterationParams): Promise<DiffParams> {
    if (!this._config.dryRun) {
      await this._delete(content, params);
    }
    return this._getDeleteResult(content, params);
  }

  /**
   * 削除結果の取得
   * dryRun=trueの場合はこのメソッドのみ実行し結果を返す
   * @param params
   * @returns
   */
  protected _getDeleteResult(content: C, params: IterationParams): DiffParams {
    return {};
  }

  /**
   * 種別固有のコンテンツの削除
   * @param params
   */
  protected abstract _delete(content: C, params: IterationParams): Promise<void>;
}
export default InputBase;
