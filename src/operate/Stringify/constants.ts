/**
 * パーサー
 */
export const STRINGIFIER = {
  json: (obj: any, args: any[] = []) => JSON.stringify(obj, ...args),
};
