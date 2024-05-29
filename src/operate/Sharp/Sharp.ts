import SharpLib from 'sharp';
import { CONTENT_TYPE } from '../../constants';
import ManipulativeOperationBase from '../ManipulativeOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Manipulation, OperationParams } from '../types';
import SharpManipulation from './SharpManipulation';
import SharpManipulationFactory from './SharpManipulationFactory';
import { SharpConfig, SharpManipulationConfigBase } from './types';

/**
 * sharpを用いた画像の操作
 */
class Sharp extends ManipulativeOperationBase<Buffer, SharpConfig, SharpLib.Sharp> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  protected _createManipuration(config: SharpManipulationConfigBase): Manipulation<SharpLib.Sharp> | undefined {
    const manipulationFn = SharpManipulationFactory.get(config);
    if (manipulationFn) {
      return new SharpManipulation<SharpManipulationConfigBase>(manipulationFn, config);
    }
  }

  protected async _toInstance(content: Buffer, params: OperationParams): Promise<SharpLib.Sharp> {
    return SharpLib(content, this._config.options);
  }

  protected async _toContent(instance: SharpLib.Sharp, params: OperationParams): Promise<Buffer> {
    return await instance.toBuffer();
  }
}
export default Sharp;
OperationFactory.register(OPERATION_TYPE.SHARP, Sharp);
