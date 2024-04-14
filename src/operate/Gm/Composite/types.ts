import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Composite`の設定
 */
export type CompositeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.COMPOSITE> & {
  changeImagePath: string;
  maskImagePath?: string;
};
