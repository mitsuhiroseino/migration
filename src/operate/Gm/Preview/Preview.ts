import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulation } from '../types';
import { PreviewConfig } from './types';

/**
 * プレビュー
 *
 * 画像のプレビューを生成することができる。サムネイルやプレビュー画像を生成する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-preview
 *
 * @param state gmのインスタンス(ステート)
 * @param config Previewのコンフィグ
 * @returns gmのインスタンス
 */
const Preview: GmManipulation<PreviewConfig> = (state, config) => {
  const { previewType } = config;
  return state.preview(previewType);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.PREVIEW, Preview);
export default Preview;
