import Jimp from 'jimp';
import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import throwError from '../../utils/throwError';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import ImageManipulationFactory from './ImageManipulationFactory';
import { ImageConfig } from './types';

/**
 * 画像に対する操作
 */
class Image extends OperationBase<Buffer, ImageConfig> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  async operate(content: Buffer, params: OperationParams): Promise<Buffer> {
    const config = this._config;
    const { manipulations, mime } = config;
    let jimp = await Jimp.read(content);

    for (const manipulationConfig of asArray(manipulations)) {
      const manipulation = ImageManipulationFactory.get(manipulationConfig.type);
      if (manipulation) {
        jimp = await manipulation(jimp, manipulationConfig);
      } else {
        throwError(`There was no manipulation "${manipulationConfig.type}".`, config);
      }
    }

    let mimeType;
    if (mime) {
      mimeType = mime;
    } else {
      mimeType = jimp.getMIME();
    }

    return await jimp.getBufferAsync(mimeType);
  }
}
export default Image;
OperationFactory.register(OPERATION_TYPE.IMAGE, Image);
