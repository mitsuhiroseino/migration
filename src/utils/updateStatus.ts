/**
 * 優先度を見てステータスを更新する
 * @param currentStatus 現在のステータス
 * @param newStatus 新しいステータス
 * @param priority ステータスの優先度
 * @returns
 */
export default function updateStatus<S extends string>(currentStatus: S, newStatus: S, priority: Record<S, number>): S {
  if (priority[currentStatus] < priority[newStatus]) {
    return newStatus;
  }
  return currentStatus;
}
