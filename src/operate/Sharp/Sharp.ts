import SharpLib from 'sharp';
import { CONTENT_TYPE } from '../../constants';
import asArray from '../../utils/asArray';
import throwError from '../../utils/throwError';
import OperationBase from '../OperationBase';
import OperationFactory from '../OperationFactory';
import { OPERATION_STATUS, OPERATION_TYPE } from '../constants';
import { OperationParams, OperationResult } from '../types';
import SharpManipulationFactory from './SharpManipulationFactory';
import { SharpConfig } from './types';

/**
 * sharpを用いた画像の操作
 */
class Sharp extends OperationBase<Buffer, SharpConfig> {
  readonly contentTypes = CONTENT_TYPE.BINARY;

  async operate(content: Buffer, params: OperationParams): Promise<OperationResult<Buffer>> {
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

    const buffer = await sharp.toBuffer();

    const status =
      content.length !== buffer.length || content.equals(buffer)
        ? OPERATION_STATUS.CHANGED
        : OPERATION_STATUS.UNCHANGED;
    return { status, content: buffer };
  }
}
export default Sharp;
OperationFactory.register(OPERATION_TYPE.SHARP, Sharp);
