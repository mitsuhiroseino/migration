import removeExtension from '../../utils/removeExtension';

/**
 * URLからitem名を取得する
 * @param target URL
 * @param removeIndex index.htmlは無視
 * @param removeExtensions 拡張子は削除
 * @returns
 */
export default function getItemNameFromUrl(
  target: string,
  removeIndex?: boolean,
  removeExtensions?: string | string[],
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
  if (removeExtensions) {
    itemName = removeExtension(itemName, removeExtensions);
  }

  return itemName;
}
