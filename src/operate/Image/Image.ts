import Jimp from 'jimp';
import { CONTENT_TYPE } from '../../constants';
import ManipulativeOperationBase from '../ManipulativeOperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { Manipulation, OperationParams } from '../types';
import ImageManipulation from './ImageManipulation';
import ImageManipulationFactory from './ImageManipulationFactory';
import { ImageConfig, ImageManipulationConfigBase } from './types';

/**
 * 画像に対する操作
 */
class Image extends ManipulativeOperationBase<Buffer, ImageConfig, Jimp> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  protected _createManipuration(config: ImageManipulationConfigBase): Manipulation<Jimp> | undefined {
    const manipulationFn = ImageManipulationFactory.get(config);
    if (manipulationFn) {
      return new ImageManipulation<ImageManipulationConfigBase>(manipulationFn, config);
    }
  }

  protected async _toInstance(content: Buffer, params: OperationParams): Promise<Jimp> {
    return await Jimp.read(content);
  }

  protected async _toContent(instance: Jimp, params: OperationParams): Promise<Buffer> {
    const { mime } = this._config;

    let mimeType;
    if (mime) {
      mimeType = mime;
    } else {
      mimeType = instance.getMIME();
    }

    return await instance.getBufferAsync(mimeType);
  }
}
export default Image;
OperationFactory.register(OPERATION_TYPE.IMAGE, Image);
