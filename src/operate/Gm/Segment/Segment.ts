import GmManipulationFactory from '../GmManipulationFactory';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationFn } from '../types';
import { SegmentConfig } from './types';

/**
 * 画像分割
 *
 * 画像をセグメント化して分割することができる。画像を領域ごとに分割し、個々の領域を処理する。
 *
 * http://www.graphicsmagick.org/GraphicsMagick.html#details-segment
 *
 * @param state gmのインスタンス(ステート)
 * @param config Segmentのコンフィグ
 * @returns gmのインスタンス
 */
const Segment: GmManipulationFn<SegmentConfig> = (state, config) => {
  const { clustherThreshold, smoothingThreshold } = config;
  return state.segment(clustherThreshold, smoothingThreshold);
};
GmManipulationFactory.register(GM_MANIPULATION_TYPE.SEGMENT, Segment);
export default Segment;
