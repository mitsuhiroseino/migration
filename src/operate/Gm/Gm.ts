import gm from 'gm';
import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import throwError from '../../utils/throwError';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_STATUS, OPERATION_TYPE } from '../constants';
import { OperationParams, OperationResult } from '../types';
import GmManipulationFactory from './GmManipulationFactory';
import { GmConfig } from './types';

/**
 * 画像処理
 * 利用するためには実行環境に対応したGraphicsMagickのインストールが必要
 */
class Gm extends OperationBase<Buffer, GmConfig> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  async operate(content: Buffer, params: OperationParams): Promise<OperationResult<Buffer>> {
    const config = this._config;
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
      const callback = (err, buffer: Buffer) => {
        if (err) {
          reject(err);
        } else {
          const status =
            content.length !== buffer.length || content.equals(buffer)
              ? OPERATION_STATUS.CHANGED
              : OPERATION_STATUS.UNCHANGED;
          resolve({ status, content: buffer });
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
  }
}
export default Gm;
OperationFactory.register(OPERATION_TYPE.GM, Gm);
