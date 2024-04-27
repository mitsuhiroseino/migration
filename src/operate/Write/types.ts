import { CommonOutputConfig, VariableString } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase, OperationParams } from '../types';

/**
 * ファイルを出力する操作
 */
export type WriteConfig = OperationConfigBase<typeof OPERATION_TYPE.WRITE> &
  CommonOutputConfig & {
    /**
     * paramsからファイルの内容を取得する際のプロパティ名
     * デフォルトは_resource
     */
    paramName?: VariableString<OperationParams>;

    /**
     * paramNameの要素のプレイスホルダーを置換するなどの前処理を行わない
     */
    preserveParamName?: boolean;
  };
