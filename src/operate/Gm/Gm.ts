import gm from 'gm';
import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import throwError from '../../utils/throwError';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Operation } from '../types';
import GmManipulationFactory from './GmManipulationFactory';
import { GmConfig } from './types';

/**
 * 画像処理
 * 利用するためには実行環境に対応したGraphicsMagickのインストールが必要
 * @param content 処理対象
 * @param config 操作設定
 * @param params 1繰り返し毎のパラメーター
 * @returns 処理結果
 */
const Gm: Operation<Buffer, GmConfig> = async (content, config, params) => {
  const { manipulations, fileFormat } = config;
  let state = gm(content);

  for (const manipulationConfig of asArray(manipulations)) {
    const manipulation = GmManipulationFactory.get(manipulationConfig.type);
    if (manipulation) {
      state = manipulation(state, manipulationConfig);
    } else {
      throwError(`There was no manipulation "${manipulationConfig.type}".`, config);
    }
  }
  return await new Promise((resolve, reject) => {
    const callback = (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    };
    if (fileFormat != null) {
      // ファイル形式の変換あり
      return state.toBuffer(fileFormat, callback);
    } else {
      // ファイル形式の変換なし
      return state.toBuffer(callback);
    }
  });
};
export default Gm;
OperationFactory.register(OPERATION_TYPE.GM, Gm, CONTENT_TYPE.BINARY);
