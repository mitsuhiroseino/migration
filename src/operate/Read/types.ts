import { InputSpecificConfig, VariableString } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationBundlerConfig, OperationConfigBase, OperationParams } from '../types';

/**
 * ファイルを入力して内容をparamsに設定する操作
 */
export type ReadConfig = OperationConfigBase<typeof OPERATION_TYPE.READ> &
  OperationBundlerConfig &
  InputSpecificConfig & {
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
