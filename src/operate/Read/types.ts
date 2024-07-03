import { InputConfig } from '../../io';
import { VariableString } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationBundlerConfig, OperationConfigBase, OperationParams } from '../types';

/**
 * ファイルを入力して内容をparamsに設定する操作
 */
export type ReadConfig<I extends InputConfig = InputConfig> = OperationConfigBase<typeof OPERATION_TYPE.READ> &
  OperationBundlerConfig & {
    /**
     * 入力の設定
     * 文字列を設定した場合はFileとして扱う
     */
    input?: I | string;

    /**
     * paramsに設定する際のプロパティ名
     * デフォルトは_resource
     */
    paramName?: VariableString<OperationParams>;

    /**
     * paramNameの要素のプレイスホルダーを置換するなどの前処理を行わない
     */
    preserveParamName?: boolean;
  };
