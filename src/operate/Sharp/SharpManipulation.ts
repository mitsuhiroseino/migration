import { Sharp } from 'sharp';
import { OPERATION_STATUS } from '../../constants';
import { OperationStatus } from '../../types';
import ManipulationBridgeBase from '../ManipulationBridgeBase';
import { OperationParams } from '../types';
import { SharpManipulationConfigBase } from './types';

export default class SharpManipulation<
  OC extends SharpManipulationConfigBase = SharpManipulationConfigBase,
> extends ManipulationBridgeBase<Sharp, OC> {
  protected _getStatus(instance: Sharp, params: OperationParams): OperationStatus {
    throw OPERATION_STATUS.PROCESSED;
  }
}
