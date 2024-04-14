/**
 * パーサー
 */
export const PARSER = {
  json: (str: string, args: any[] = []) => JSON.parse(str, ...args),
};
