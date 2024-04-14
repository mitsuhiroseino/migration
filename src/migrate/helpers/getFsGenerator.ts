import fs from 'fs-extra';
import path from 'path';
import { IterationParams } from '../../types';
import { MigrationJobConfig } from '../types';

/**
 * 取得対象のエントリー種別
 */
export type EntryType = 'file' | 'dir' | 'both';

/**
 * 指定のパス配下の要素のパスを取得するジェネレーターを作成する関数
 * @returns ジェネレーター
 */
export default function getFsGenerator(rootPath: string): (config: MigrationJobConfig) => Generator<IterationParams> {
  // ディレクトリを辿りながらパスを返すジェネレーター
  const iterateFs = function* (
    currentPath: string,
    entryType: EntryType = 'file',
    depth: number = 0,
    parentPath?: string,
  ): Generator<IterationParams> {
    const stat = fs.statSync(currentPath);
    if (stat.isFile()) {
      if (depth !== 0 && (entryType === 'file' || entryType === 'both')) {
        // ファイルのパスを返す
        yield { _path: currentPath, _depth: depth, _entryType: 'file', _parentPath: parentPath };
      }
    } else {
      if (depth !== 0 && (entryType === 'dir' || entryType === 'both')) {
        // ディレクトリのパスを返す
        yield { _path: currentPath, _depth: depth, _entryType: 'dir', _parentPath: parentPath };
      }
      const items = fs.readdirSync(currentPath);
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        // 子要素を処理
        yield* iterateFs(itemPath, entryType, depth + 1, currentPath);
      }
    }
  };

  // ルートパスを処理してメインのジェネレーターを実行するジェネレーター
  return function* (config: MigrationJobConfig): Generator<IterationParams> {
    yield* iterateFs(path.normalize(rootPath), config.entryType);
  };
}
