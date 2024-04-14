import { PreviewType } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Preview`の設定
 */
export type PreviewConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.PREVIEW> & {
  previewType: PreviewType | string;
};
