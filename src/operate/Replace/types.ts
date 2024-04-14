import { ReplaceWithConfigsConfig } from '../../utils/replaceWithConfigs';
import { OPERATION_TYPE } from '../constants';
import { OperationConfigBase } from '../types';

/**
 * 文字列置換の設定
 */
export type ReplaceConfig = OperationConfigBase<typeof OPERATION_TYPE.REPLACE> & ReplaceWithConfigsConfig & {};
