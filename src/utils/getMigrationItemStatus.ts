import { MIGRATION_ITEM_STATUS_PRIORITY } from '../constants';
import { MigrationItemStatus } from '../types';

export default function getMigrationItemStatus(
  currentStatus: MigrationItemStatus,
  newStatus: MigrationItemStatus,
): MigrationItemStatus {
  if (MIGRATION_ITEM_STATUS_PRIORITY[currentStatus] < MIGRATION_ITEM_STATUS_PRIORITY[newStatus]) {
    return newStatus;
  }
  return currentStatus;
}
