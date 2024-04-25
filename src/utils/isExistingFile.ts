import fsStat, { FsStatOptions } from './fsStat';

/**
 * 対象のパスが存在するファイルのものであることを判定する
 * @param targetPath 対象のパス
 * @returns
 */
export default async function isExistingFile(targetPath: string, options?: FsStatOptions) {
  try {
    const stats = await fsStat(targetPath, options);
    return stats.isFile();
  } catch (error) {
    // エラーの場合はfalse
    return false;
  }
}
