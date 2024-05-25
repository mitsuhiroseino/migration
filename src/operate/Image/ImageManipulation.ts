import Jimp from 'jimp';
import { OPERATION_STATUS } from '../../constants';
import { OperationStatus } from '../../types';
import ManipulationBridgeBase from '../ManipulationBridgeBase';
import { OperationParams } from '../types';
import { ImageManipulationConfigBase } from './types';

export default class ImageManipulation<
  OC extends ImageManipulationConfigBase = ImageManipulationConfigBase,
> extends ManipulationBridgeBase<Jimp, OC> {
  protected _getStatus(instance: Jimp, params: OperationParams): OperationStatus {
    throw OPERATION_STATUS.PROCESSED;
  }
}
