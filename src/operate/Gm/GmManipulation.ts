import { State } from 'gm';
import ManipulationBridgeBase from '../ManipulationBridgeBase';
import { OPERATION_STATUS } from '../constants';
import { OperationParams, OperationStatus } from '../types';
import { GmManipulationConfigBase } from './types';

export default class GmManipulation<
  OC extends GmManipulationConfigBase = GmManipulationConfigBase,
> extends ManipulationBridgeBase<State, OC> {
  protected _getStatus(instance: State, params: OperationParams): OperationStatus {
    throw OPERATION_STATUS.CHANGED;
  }
}
