import { Content } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationBundlerConfig, OperationConfigBase } from '../types';

/**
 * 編集関数の設定
 */
export type BundleConfig<C extends Content = Content> = OperationConfigBase<typeof OPERATION_TYPE.BUNDLE> &
  OperationBundlerConfig;
