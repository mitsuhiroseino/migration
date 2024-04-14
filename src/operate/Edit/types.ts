import { Content } from '../../types';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase, OperationParams } from '../types';

/**
 * 編集関数の設定
 */
export type EditConfig<C = Content> = OperationConfigBase<typeof OPERATION_TYPE.EDIT> & {
  /**
   * 編集関数
   */
  editContent: (content: C, params: OperationParams) => Promise<C>;
};
