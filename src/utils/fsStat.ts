import fs from 'fs-extra';

export type FsStatOptions = fs.StatOptions & { ignoreSymlinks?: boolean };

/**
 * ファイル・ディレクトリの情報を返す。
 * ファイル・ディレクトリが存在しない場合はnullを返す
 * ignoreSymlinks=trueでシンボリックリンクを判定した場合の結果は下記の通り
 *
 * - isDirectory(): false
 * - isFile(): false
 * - isSymbolicLink: true
 *
 * @param filePath
 * @param ignoreSymlinks
 * @returns
 */
export default async function fsStat(
  filePath: string,
  options?: FsStatOptions,
): Promise<fs.Stats | fs.BigIntStats | null> {
  const { ignoreSymlinks, ...rest } = options;
  if (ignoreSymlinks) {
    // シンボリックリンクを辿らない場合
    try {
      return await fs.lstat(filePath, rest);
    } catch (error) {
      return null;
    }
  } else {
    // シンボリックリンクを辿る場合
    try {
      return await fs.stat(filePath, rest);
    } catch (error) {
      return null;
    }
  }
}
