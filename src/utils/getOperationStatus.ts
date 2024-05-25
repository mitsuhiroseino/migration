import { OPERATION_STATUS_PRIORITY } from '../constants';
import { OperationStatus } from '../types';

export default function getOperationStatus(
  currentStatus: OperationStatus,
  newStatus: OperationStatus,
): OperationStatus {
  if (OPERATION_STATUS_PRIORITY[currentStatus] < OPERATION_STATUS_PRIORITY[newStatus]) {
    return newStatus;
  }
  return currentStatus;
}
