import { MIGRATION_ITEM_STATUS } from '../constants';
import { Content, DiffParams, IterationParams } from '../types';
import throwError from '../utils/throwError';
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

  async delete(content: C, params: IterationParams): Promise<DiffParams | void> {
    if (!this._config.dryRun) {
      await this._delete(content, params);
    }
    return this._getDeleteResult(content, params);
  }

  /**
   * 種別固有のコンテンツの削除
   * @param params
   */
  protected abstract _delete(content: C, params: IterationParams): Promise<void>;

  /**
   * 削除結果の取得
   * dryRun=trueの場合はこのメソッドのみ実行し結果を返す
   * @param params
   * @returns
   */
  protected _getDeleteResult(content: C, params: IterationParams): DiffParams | void {}

  /**
   * 対象が存在しなかった場合の処理
   * @param errorMessage
   * @returns
   */
  protected _handleNotFound<E>(error: E) {
    const { notFoundAction } = this._config;
    if (notFoundAction === 'break') {
      // breakする場合
      return {
        status: MIGRATION_ITEM_STATUS.BREAK,
      };
    } else if (notFoundAction === 'skip') {
      // skipする場合
      return {
        status: MIGRATION_ITEM_STATUS.SKIPPED,
      };
    } else {
      // 上記以外はエラー
      throwError(String(error), this._config);
    }
  }
}
export default InputBase;
