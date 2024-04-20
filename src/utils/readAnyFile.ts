import isExistingFile from './isExistingFile';
import readBuffer, { ReadBufferOptions } from './readBuffer';
import readJson, { ReadJsonOptions } from './readJson';
import readText, { ReadTextOptions } from './readText';

export type ReadAnyFileOptions = ReadBufferOptions &
  ReadJsonOptions &
  ReadTextOptions & {
    /**
     * ファイルが無い場合はnullを返す
     */
    nullOnNotFound?: boolean;

    /**
     * JSONで読み込む場合
     */
    json?: boolean;
  };

/**
 * ファイルを入力する
 * @param filePath ファイルのパス
 * @param options オプション
 * @returns
 */
export default async function readAnyFile<R>(filePath: string, options: ReadAnyFileOptions = {}): Promise<R> {
  const { nullOnNotFound, encoding, json, ...rest } = options;

  if (!isExistingFile(filePath)) {
    if (nullOnNotFound) {
      // ファイルが無い場合はnullを返す
      return null;
    } else {
      // エラー
      throw new Error(`File does not exist: ${filePath}`);
    }
  } else {
    // 指定に従った入力
    let content;
    if (encoding === 'binary') {
      // バイナリで入力
      content = await readBuffer(filePath, rest);
    } else if (json) {
      // JSONで入力
      content = await readJson(filePath, rest);
    } else {
      // テキストで入力
      content = await readText(filePath, { ...rest, encoding });
    }
    return content;
  }
}
