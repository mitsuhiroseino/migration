import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Authenticate`の設定
 */
export type AuthenticateConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.AUTHENTICATE> & {
  password: string;
};
