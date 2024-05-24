import { Content } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationBundlerConfig, OperationConfigBase, OperationParams } from '../types';

/**
 * パラメーターの更新
 */
export type ParamsConfig<C extends Content = Content> = OperationConfigBase<typeof OPERATION_TYPE.PARAMS> &
  OperationBundlerConfig & {
    /**
     * パラメーターの差分作成関数
     * @param content コンテンツ
     * @param params 現在のパラメーター
     * @returns 現在のパラメーターとの差分
     */
    createDiff: (content: C, params: OperationParams) => Promise<OperationParams>;
  };
