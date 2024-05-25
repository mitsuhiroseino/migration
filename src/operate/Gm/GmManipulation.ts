import { State } from 'gm';
import { OPERATION_STATUS } from '../../constants';
import { OperationStatus } from '../../types';
import ManipulationBridgeBase from '../ManipulationBridgeBase';
import { OperationParams } from '../types';
import { GmManipulationConfigBase } from './types';

export default class GmManipulation<
  OC extends GmManipulationConfigBase = GmManipulationConfigBase,
> extends ManipulationBridgeBase<State, OC> {
  protected _getStatus(instance: State, params: OperationParams): OperationStatus {
    throw OPERATION_STATUS.PROCESSED;
  }
}
