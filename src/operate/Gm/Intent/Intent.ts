import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { IntentConfig } from './types';

/**
 * カラー管理操作
 *
 * 画像の処理目的を指定することができる。色変換やリサイズなどの処理方法を指定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-intent
 *
 * @param state gmのインスタンス(ステート)
 * @param config Intentのコンフィグ
 * @returns gmのインスタンス
 */
const Intent: GmManipulationFn<IntentConfig> = (state, config) => {
  const { intentType } = config;
  return state.intent(intentType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.INTENT, Intent);
export default Intent;
