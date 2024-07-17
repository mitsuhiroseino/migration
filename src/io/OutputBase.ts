import isBuffer from 'lodash/isBuffer';
import { MIGRATION_ITEM_STATUS } from '../constants';
import { Content, DiffParams, IterationParams, MigrationItemStatus } from '../types';
import stringify from '../utils/stringify';
import throwError from '../utils/throwError';
import IoBase from './IoBase';
import { Output, OutputConfigBase, OutputResultBase, OutputReturnValue } from './types';

/**
 * 出力
 */
abstract class OutputBase<
    C extends Content,
    OC extends OutputConfigBase<OutputConfigBase['type']> = OutputConfigBase<OutputConfigBase['type']>,
    OR extends OutputResultBase = OutputResultBase,
  >
  extends IoBase<OC>
  implements Output<C, OR>
{
  async prepare(params: IterationParams): Promise<DiffParams | void> {}

  async write(content: C, params: IterationParams): Promise<OutputReturnValue<OR>> {
    const { dryRun, stringifier: stringifyOptions, noContentAction } = this._config;
    if (!dryRun) {
      if (content != null || noContentAction === 'process') {
        if (stringifyOptions && !isBuffer(content)) {
          content = stringify(content, stringifyOptions) as C;
        }
      }
      await this._write(content, params);
    }
    return this._getWriteResult(content, params);
  }

  /**
   * 種別固有のコンテンツの出力
   * @param content
   * @param params
   */
  protected abstract _write(content: C, params: IterationParams): Promise<void>;

  /**
   * 出力結果の取得
   * dryRun=trueの場合はこのメソッドのみ実行し結果を返す
   * @param params
   * @returns
   */
  protected _getWriteResult(content: C, params: IterationParams): OutputReturnValue<OR> {
    return this._handleNoContent(content, params);
  }

  async copy(params: IterationParams): Promise<OutputReturnValue<OR>> {
    if (!this._config.dryRun) {
      await this._copy(params);
    }
    return this._getCopyResult(params);
  }

  /**
   * 種別固有のコンテンツのコピー
   * @param params
   */
  protected abstract _copy(params: IterationParams): Promise<void>;

  /**
   * コピー結果の取得
   * dryRun=trueの場合はこのメソッドのみ実行し結果を返す
   * @param params
   * @returns
   */
  protected _getCopyResult(params: IterationParams): OutputReturnValue<OR> {
    return {
      status: MIGRATION_ITEM_STATUS.COPIED,
    };
  }

  async move(params: IterationParams): Promise<OutputReturnValue<OR>> {
    if (!this._config.dryRun) {
      await this._move(params);
    }
    return this._getMoveResult(params);
  }

  /**
   * 種別固有のコンテンツの移動
   * @param params
   */
  protected abstract _move(params: IterationParams): Promise<void>;

  /**
   * 移動結果の取得
   * dryRun=trueの場合はこのメソッドのみ実行し結果を返す
   * @param params
   * @returns
   */
  protected _getMoveResult(params: IterationParams): OutputReturnValue<OR> {
    return {
      status: MIGRATION_ITEM_STATUS.MOVED,
    };
  }

  protected async _end(params: IterationParams): Promise<DiffParams | void> {
    // 次のループへ渡す値
    return {
      lastOutputItem: params._outputItem,
    };
  }

  /**
   * 対象がnullの場合の処理
   * @param params
   * @returns
   */
  protected _handleNoContent(
    content: unknown,
    params: IterationParams,
    defaultStatus: MigrationItemStatus = MIGRATION_ITEM_STATUS.CONVERTED,
  ) {
    const { noContentAction } = this._config;
    if (content != null || noContentAction === 'process') {
      // 出力する場合
      return {
        status: defaultStatus,
      };
    } else if (noContentAction === 'break') {
      // breakする場合
      return {
        status: MIGRATION_ITEM_STATUS.BREAK,
      };
    } else if (noContentAction === 'skip') {
      // skipする場合
      return {
        status: MIGRATION_ITEM_STATUS.SKIPPED,
      };
    } else {
      // 上記以外はエラー
      throwError(`The content is null or undefined: ${params._outputItem}`, this._config);
    }
  }
}
export default OutputBase;
