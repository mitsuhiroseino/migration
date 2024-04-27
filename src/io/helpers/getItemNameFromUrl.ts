import removeExtension from '../../utils/removeExtension';

/**
 * URLからitem名を取得する
 * @param url URL
 * @param removeIndex index.htmlは無視
 * @param removeExtensions 拡張子は削除
 * @returns
 */
export default function getItemNameFromUrl(url: string, removeIndex?: boolean, removeExtensions?: string | string[]) {
  // itemNameの取得
  const nodes = url.split('/');
  while (!nodes[nodes.length - 1]) {
    nodes.pop();
  }
  const lastNode = nodes[nodes.length - 1];
  let itemName;
  if (removeIndex && lastNode.startsWith('index.')) {
    itemName = nodes[nodes.length - 2];
  } else {
    itemName = lastNode;
  }
  if (removeExtensions) {
    itemName = removeExtension(itemName, removeExtensions);
  }

  return itemName;
}
