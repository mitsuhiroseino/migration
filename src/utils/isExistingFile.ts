import fs from 'fs-extra';

/**
 * 対象のパスが存在するファイルのものであることを判定する
 * @param targetPath 対象のパス
 * @returns
 */
export default async function isExistingFile(targetPath: string) {
  try {
    const stats = await fs.stat(targetPath);
    return stats.isFile();
  } catch (error) {
    // エラーの場合はfalse
    return false;
  }
}
