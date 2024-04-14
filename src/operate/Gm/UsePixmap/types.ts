import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`UsePixmap`の設定
 */
export type UsePixmapConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.USE_PIXMAP> & {};
