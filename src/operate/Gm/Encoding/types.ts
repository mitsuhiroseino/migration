import { Encoding } from 'gm';
import { GM_MANIPULATION_TYPE } from '../constants';
import { GmManipulationConfigBase } from '../types';

/**
 * 画像操作`Encoding`の設定
 */
export type EncodingConfig = GmManipulationConfigBase<typeof GM_MANIPULATION_TYPE.ENCODING> & {
  encoding: Encoding | string;
};
