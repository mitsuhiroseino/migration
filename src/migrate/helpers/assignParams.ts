import { AssignedParams } from '../../types';

/**
 * パラメーターに処理に応じて変動するパラメーターを設定する
 * @param params パラメーター
 * @param variedParams 変動するパラメーター
 */
export default function assignParams<P extends object, S extends object>(
  params: P,
  variedParams: S,
): P & AssignedParams<S> {
  const assignedParams: any = { ...params };
  for (const key in variedParams) {
    assignedParams[`_${key}`] = variedParams[key];
  }
  return assignedParams;
}
