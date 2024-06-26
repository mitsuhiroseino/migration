import csv from 'csv/sync';
import yaml from 'js-yaml';
import isPlainObject from 'lodash/isPlainObject';

/**
 * パーサー
 */
const PARSER = {
  json: (str: string, args: any[] = []) => JSON.parse(str, ...args),
  yaml: (str: string, args: any[] = []) => yaml.load(str, ...args),
  csv: (str: string, args: any[] = []) => csv.parse(str, ...args),
  js: (str: string) => new Function(`return (${str})`)(),
} as const;

export type ParserType = keyof typeof PARSER;

/**
 * 文字列をオブジェクトや配列に変換する
 */
export type ParseOptions =
  | ParserType
  | {
      /**
       * パーサー種別
       * デフォルトは'json'
       */
      type?: ParserType;

      /**
       * パーサーに渡す引数
       */
      args?: any[];
    };

/**
 * 文字列をパースする
 * @param str 文字列
 * @param options オプション
 * @returns
 */
export default function parse<R = any>(str: string, options?: ParseOptions): R {
  let type, args;
  if (isPlainObject(options)) {
    type = options['type'];
    args = options['args'];
  } else {
    type = options;
  }
  return PARSER[type || 'json'](str, args);
}
