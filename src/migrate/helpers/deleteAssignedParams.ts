/**
 * パラメーターから処理内で設定された値を削除する
 * @param params パラメーター
 * @param assignedParams 処理内で設定された値
 */
export default function deleteAssignedParams<P extends object>(params: P, assignedParams: any): P {
  for (const key in assignedParams) {
    delete params[`_${key}`];
  }
  return params;
}
