import asArray from './asArray';

/**
 * 指定の拡張子を削除する
 * @param item 対象の文字列
 * @param ext '.'を含んだ拡張子
 * @returns
 */
export default function removeExtension(item: string, exts: string | string[]) {
  for (const ext of asArray(exts)) {
    if (item.endsWith(ext)) {
      return item.substring(0, item.length - ext.length);
    }
  }
  return item;
}
