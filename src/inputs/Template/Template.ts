import fs from 'fs-extra';
import Handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import path from 'path';
import { DEFAULT_TEXT_ENCODING } from '../../constants';
import { Content, IterationParams } from '../../types';
import finishDynamicValue from '../../utils/finishDynamicValue';
import { InputGenerator, InputResult } from '../types';
import { TemplateInputConfig } from './types';

helpers();

/**
 * 指定のパス配下のファイルを読み込むジェネレーター
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
async function* Template(config: TemplateInputConfig, params: IterationParams): InputGenerator<Content> {
  const { templatePath } = config;
  const rootPath: string = finishDynamicValue(templatePath, params, config);
  // ファイルの読み込み
  yield* readTemplates(rootPath, path.basename(rootPath), config, params);
}
export default Template;

/**
 * 指定のパス配下のファイルを読み込む関数
 * @param inputPath テンプレートパス
 * @param itemName テンプレートファイル・ディレクトリ名
 * @param config コンフィグ
 * @param params 1繰り返し毎のパラメーター
 * @param depth ルートからの深さ
 */
const readTemplates = async function* (
  inputPath: string,
  itemName: string,
  config: TemplateInputConfig,
  params: IterationParams,
  depth: number = 0,
): AsyncGenerator<InputResult<Content>> {
  const stat = await fs.stat(inputPath);
  if (stat.isFile()) {
    // ファイルを読み込んで返す
    const { inputEncoding = DEFAULT_TEXT_ENCODING, compileOptions } = config;
    const template = await fs.readFile(inputPath, { encoding: inputEncoding });
    const templateFn = Handlebars.compile(template, compileOptions);
    const content: string = templateFn(params);

    yield { content, params: { inputPath, itemName } };
  } else {
    // 配下のディレクトリ、ファイルを再帰的に処理
    const items = await fs.readdir(inputPath);
    for (const item of items) {
      const itemPath = path.join(inputPath, item);
      // 子要素を処理
      yield* readTemplates(itemPath, item, config, params, depth + 1);
    }
  }
};
