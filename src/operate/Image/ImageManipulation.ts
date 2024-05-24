import Jimp from 'jimp';
import ManipulationBridgeBase from '../ManipulationBridgeBase';
import { OPERATION_STATUS } from '../constants';
import { OperationParams, OperationStatus } from '../types';
import { ImageManipulationConfigBase } from './types';

export default class ImageManipulation<
  OC extends ImageManipulationConfigBase = ImageManipulationConfigBase,
> extends ManipulationBridgeBase<Jimp, OC> {
  protected _getStatus(instance: Jimp, params: OperationParams): OperationStatus {
    throw OPERATION_STATUS.CHANGED;
  }
}
