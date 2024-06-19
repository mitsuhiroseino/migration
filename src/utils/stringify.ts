import csv from 'csv/sync';
import yaml from 'js-yaml';
import isPlainObject from 'lodash/isPlainObject';
import serialize from 'serialize-javascript';

/**
 * ストリンギファー
 */
const STRINGIFIER = {
  json: (obj: any, args: any[] = []) => JSON.stringify(obj, ...args),
  yaml: (obj: any, args: any[] = []) => yaml.dump(obj, ...args),
  csv: (obj: any, args: any[] = []) => csv.stringify(obj, ...args),
  js: (obj: any, args: any[] = []) => serialize(obj, ...args),
} as const;

export type StringifierType = keyof typeof STRINGIFIER;

/**
 * オブジェクトや配列を文字列に変換する
 */
export type StringifyOption =
  | StringifierType
  | {
      /**
       * ストリンギファー
       */
      stringifier?: StringifierType;

      /**
       * ストリンギファーに渡す引数
       */
      args?: any[];
    };

/**
 * 値を文字列化する
 * @param value 値
 * @param options オプション
 * @returns
 */
export default function stringify<V = any>(value: V, options?: StringifyOption): string {
  let stringifier, args;
  if (isPlainObject(options)) {
    stringifier = options['stringifier'];
    args = options['args'];
  } else {
    stringifier = options;
  }
  return STRINGIFIER[stringifier || 'json'](value, args);
}
