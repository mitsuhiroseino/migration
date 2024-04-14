import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Scene`の設定
 */
export type SceneConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.SCENE> & {
  index: number;
};
