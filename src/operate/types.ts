import { CommonConfig, Content, ContentType } from '../types';
import { FactoriableConfig } from '../utils/Factory';
import { Condition } from '../utils/isMatch';
import { OPERATION_TYPE } from './constants';
import OperationBase from './OperationBase';

export { default as OperationConfig } from './OperationConfig';

/**
 * コンテンツを操作する際の種別
 */
export type OperationType = (typeof OPERATION_TYPE)[keyof typeof OPERATION_TYPE];

/**
 * 操作の設定
 */
export type OperationConfigBase<T = OperationType | string> = CommonConfig &
  FactoriableConfig<T> & {
    /**
     * ID
     */
    operationId?: string;

    /**
     * 下記の条件に当てはまったコンテンツのみ処理を行う
     * 未指定の場合は全てのコンテンツが処理対象
     * - 文字列で指定した場合はcontentに指定の文字列が含まれているもの
     * - 正規表現の場合はcontentがtestでtrueになったもの
     * - 関数の場合は戻り値がtrueだったもの
     */
    filter?: Condition;
  };

/**
 * 子要素を持つ操作のコンフィグ
 */
export type ParentOperationConfig = {
  /**
   * 子操作
   */
  operations: (OperationConfigBase | OperationBase)[];
};

/**
 * 内容に埋め込む値
 */
export type OperationParams = {
  /**
   * コンテンツ種別
   */
  _contentType?: ContentType;

  /**
   * 任意の値
   */
  [key: string | number]: any;
};

export type TypedOperationConfig = OperationConfigBase<OperationConfigBase['type'] | string>;

/**
 * 内容に対する操作
 */
export interface Operation<C extends Content = Content> {
  getOperationId(): string;

  /**
   * 処理可能か判定する
   * @param content
   * @param params
   */
  isOperable(content: C, params: OperationParams): boolean;

  /**
   * コンテンツを操作する
   * @param content
   * @param params
   */
  operate(content: C, params: OperationParams): Promise<C | Content>;
}
