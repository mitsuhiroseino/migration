import SharpLib from 'sharp';
import { CONTENT_TYPE } from '../../constants';
import { asArray } from '../../utils';
import throwError from '../../utils/throwError';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_TYPE } from '../constants';
import { OperationParams } from '../types';
import SharpManipulationFactory from './SharpManipulationFactory';
import { SharpConfig } from './types';

/**
 * sharpを用いた画像の操作
 */
class Sharp extends OperationBase<Buffer, SharpConfig> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  async operate(content: Buffer, params: OperationParams): Promise<Buffer> {
    const config = this._config;
    const { options, manipulations } = config;
    let sharp = SharpLib(content, options);

    for (const manipulationConfig of asArray(manipulations)) {
      const manipulation = SharpManipulationFactory.get(manipulationConfig.type);
      if (manipulation) {
        sharp = manipulation(sharp, manipulationConfig);
      } else {
        throwError(`There was no manipulation "${manipulationConfig.type}".`, config);
      }
    }

    return await sharp.toBuffer();
  }
}
export default Sharp;
OperationFactory.register(OPERATION_TYPE.SHARP, Sharp);
