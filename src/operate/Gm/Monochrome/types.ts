import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Monochrome`の設定
 */
export type MonochromeConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.MONOCHROME> & {};
