import { OutputConfig } from '../../io';
import { VariableString } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase, OperationParams } from '../types';

/**
 * ファイルを出力する操作
 */
export type WriteConfig<O extends OutputConfig = OutputConfig> = OperationConfigBase<typeof OPERATION_TYPE.WRITE> & {
  /**
   * 出力の設定
   * 文字列を設定した場合はFileとして扱う
   */
  output?: O | string;

  /**
   * リソースの取得元
   * 未指定の場合はparams
   */
  resourceType?: 'params' | 'content';

  /**
   * paramsからファイルの内容を取得する際のプロパティ名
   * デフォルトは_resource
   */
  paramName?: VariableString<OperationParams>;

  /**
   * paramNameの要素のプレイスホルダーを置換するなどの前処理を行わない
   */
  preserveParamName?: boolean;

  /**
   * リソースが配列の場合は配列の要素毎に出力する
   */
  writeEach?: boolean;
};
