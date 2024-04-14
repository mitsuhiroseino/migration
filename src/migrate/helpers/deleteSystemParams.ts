/**
 * パラメーターからシステムが設定する値を削除する
 * @param params パラメーター
 * @param systemParams システムの値
 */
export default function deleteSystemParams<P extends object>(params: P, systemParams: any): P {
  for (const key in systemParams) {
    delete params[`_${key}`];
  }
  return params;
}
