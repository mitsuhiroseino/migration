import csv from 'csv/sync';
import yaml from 'js-yaml';

/**
 * パーサー
 */
export const PARSER = {
  json: (str: string, args: any[] = []) => JSON.parse(str, ...args),
  yaml: (str: string, args: any[] = []) => yaml.load(str, ...args),
  csv: (str: string, args: any[] = []) => csv.parse(str, ...args),
  js: (str: string) => new Function(`return (${str})`)(),
};
