import csv from 'csv/sync';
import yaml from 'js-yaml';
import serialize from 'serialize-javascript';

/**
 * ストリンギファー
 */
export const STRINGIFIER = {
  json: (obj: any, args: any[] = []) => JSON.stringify(obj, ...args),
  yaml: (obj: any, args: any[] = []) => yaml.dump(obj, ...args),
  csv: (obj: any, args: any[] = []) => csv.stringify(obj, ...args),
  js: (obj: any, args: any[] = []) => serialize(obj, ...args),
};
