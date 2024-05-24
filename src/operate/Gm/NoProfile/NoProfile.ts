import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { NoProfileConfig } from './types';

/**
 * プロファイル削除
 *
 * 画像からプロファイル情報を削除することができる。画像のメタデータからプロファイル情報を除去する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-noProfile
 *
 * @param state gmのインスタンス(ステート)
 * @param config NoProfileのコンフィグ
 * @returns gmのインスタンス
 */
const NoProfile: GmManipulationFn<NoProfileConfig> = (state, config) => {
  const {} = config;
  return state.noProfile();
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.NO_PROFILE, NoProfile);
export default NoProfile;
