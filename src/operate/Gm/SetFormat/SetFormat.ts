import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SetFormatConfig } from './types';

/**
 * フォーマット設定
 *
 * 画像のフォーマットを設定することができる。画像のファイル形式や拡張子を指定する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-setFormat
 *
 * @param state gmのインスタンス(ステート)
 * @param config SetFormatのコンフィグ
 * @returns gmのインスタンス
 */
const SetFormat: GmManipulationFn<SetFormatConfig> = (state, config) => {
  const { format } = config;
  return state.setFormat(format);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SET_FORMAT, SetFormat);
export default SetFormat;
