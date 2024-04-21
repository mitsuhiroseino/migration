import { Content, VariableString } from '../../types';
import { ReadAnyFileOptions } from '../../utils/readAnyFile';
import { ParamsConfig } from '../Params';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';

/**
 * ファイルを入力して内容をparamsに設定する操作
 */
export type ReadConfig<C extends Content = Content> = Omit<ParamsConfig<C>, 'type' | 'createDiff'> &
  ReadAnyFileOptions & {
    /**
     * 操作種別
     */
    type: typeof OPERATION_TYPE.READ;

    /**
     * ファイルのパス
     */
    inputPath: VariableString<OperationParams>;

    /**
     * inputPathの要素のプレイスホルダーを置換するなどの前処理を行わない
     */
    preserveInputPath?: boolean;

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
