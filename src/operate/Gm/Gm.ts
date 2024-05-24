import gm, { State } from 'gm';
import { CONTENT_TYPE } from '../../constants';
import ManipulativeOperationBase from '../ManipulativeOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Manipulation, OperationParams } from '../types';
import GmManipulation from './GmManipulation';
import GmManipulationFactory from './GmManipulationFactory';
import { GmConfig, GmManipulationConfigBase } from './types';

/**
 * 画像処理
 * 利用するためには実行環境に対応したGraphicsMagickのインストールが必要
 */
class Gm extends ManipulativeOperationBase<Buffer, GmConfig, State> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  protected _createManipuration(config: GmManipulationConfigBase): Manipulation<State> | undefined {
    const manipulationFn = GmManipulationFactory.get(config);
    if (manipulationFn) {
      return new GmManipulation<GmManipulationConfigBase>(manipulationFn, config);
    }
  }

  protected async _initialize(content: Buffer, params: OperationParams): Promise<State> {
    return gm(content);
  }

  protected async _complete(instance: State, params: OperationParams): Promise<Buffer> {
    const { fileFormat } = this._config;
    return await new Promise((resolve, reject) => {
      const callback = (err, buffer: Buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      };
      if (fileFormat != null) {
        // ファイル形式の変換あり
        return instance.toBuffer(fileFormat, callback);
      } else {
        // ファイル形式の変換なし
        return instance.toBuffer(callback);
      }
    });
  }
}
export default Gm;
OperationFactory.register(OPERATION_TYPE.GM, Gm);
