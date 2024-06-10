import isBoolean from 'lodash/isBoolean';
import removeExtension from '../../utils/removeExtension';

/**
 * URLからitem名を取得する
 * @param target URL
 * @param removeIndex 末尾のindex.*は削除する
 * @param removeExtensions 拡張子は削除する
 * @returns
 */
export default function getItemNameFromUrl(
  target: string,
  removeIndex?: boolean,
  removeExtensions?: string | string[] | boolean,
) {
  // itemNameの取得
  const url = new URL(target);
  const nodes = url.pathname.split('/');
  const lastNode = nodes[nodes.length - 1];
  let itemName;
  if (removeIndex && lastNode.startsWith('index.')) {
    // indexファイルが指定されている場合はその親の名称
    itemName = nodes[nodes.length - 2];
  } else {
    // 上記以外は末尾の名称
    itemName = lastNode;
  }
  if (isBoolean(removeExtensions)) {
    if (removeExtensions) {
      itemName = itemName.replace(/(?<!^)\.[^.]*$/, '');
    }
  } else if (removeExtensions) {
    itemName = removeExtension(itemName, removeExtensions);
  }

  return itemName;
}
