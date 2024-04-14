import { Content } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { ParentOperationConfigBase } from '../types';

/**
 * 編集関数の設定
 */
export type BundleConfig<C = Content> = ParentOperationConfigBase<typeof OPERATION_TYPE.BUNDLE, C>;
