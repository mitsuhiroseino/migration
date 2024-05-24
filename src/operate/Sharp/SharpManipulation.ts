import { Sharp } from 'sharp';
import ManipulationBridgeBase from '../ManipulationBridgeBase';
import { OPERATION_STATUS } from '../constants';
import { OperationParams, OperationStatus } from '../types';
import { SharpManipulationConfigBase } from './types';

export default class SharpManipulation<
  OC extends SharpManipulationConfigBase = SharpManipulationConfigBase,
> extends ManipulationBridgeBase<Sharp, OC> {
  protected _getStatus(instance: Sharp, params: OperationParams): OperationStatus {
    throw OPERATION_STATUS.CHANGED;
  }
}
