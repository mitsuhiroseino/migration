import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { ProfileConfig } from './types';

/**
 * プロファイル追加
 *
 * 画像にプロファイル情報を適用することができる。画像の色空間や色の表現を定義するプロファイル情報を適用する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
 *
 * @param state gmのインスタンス(ステート)
 * @param config Profileのコンフィグ
 * @returns gmのインスタンス
 */
const Profile: GmManipulationFn<ProfileConfig> = (state, config) => {
  const { filename } = config;
  return state.profile(filename);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PROFILE, Profile);
export default Profile;
