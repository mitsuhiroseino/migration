import fs from 'fs-extra';
import Handlebars from 'handlebars';
import helpers from 'handlebars-helpers';
import path from 'path';
import { CONTENT_TYPE, DEFAULT_TEXT_ENCODING, ITEM_TYPE } from '../../../constants';
import { Content, IterationParams, Optional } from '../../../types';
import finishDynamicValue from '../../../utils/finishDynamicValue';
import isMatch from '../../../utils/isMatch';
import throwError from '../../../utils/throwError';
import InputFactory from '../InputFactory';
import { INPUT_TYPE } from '../constants';
import { Input, InputGenerator } from '../types';
import { TemplateInputConfig, TemplateInputResult } from './types';

helpers();

/**
 * 指定のパス配下のファイルを読み込むジェネレーター
 * @param config 入力設定
 * @param params 1繰り返し毎のパラメーター
 */
const Template: Input<Content, TemplateInputConfig, TemplateInputResult> = async function* (config, params) {
  const { templatePath } = config;
  const rootPath: string = finishDynamicValue(templatePath, params, config);
  const availablePath = await fs.exists(rootPath);
  if (availablePath) {
    // テンプレートファイルの読み込み
    yield* readTemplates(rootPath, path.dirname(rootPath), path.basename(rootPath), config, params);
  } else {
    throwError(`"${rootPath}" does not exist.`, config);
  }
};
InputFactory.register(INPUT_TYPE.TEMPLATE, Template);
export default Template;

/**
 * 指定のパス配下のファイルを読み込む関数
 * @param inputPath テンプレートパス
 * @param inputItem テンプレートファイル・ディレクトリ名
 * @param config コンフィグ
 * @param params 1繰り返し毎のパラメーター
 * @param inputRootPath ルートのパス
 * @param depth ルートからの深さ
 */
const readTemplates = async function* (
  inputPath: string,
  inputItem: string,
  inputParentPath: string,
  config: Optional<TemplateInputConfig, 'type'>,
  params: IterationParams,
  inputRootPath: string = inputPath,
  depth: number = 0,
): InputGenerator<Content, TemplateInputResult> {
  if (depth > 0 && !isMatch(inputPath, config.filter, params)) {
    // フィルタリングされた場合
    return;
  }

  const itemType = config.itemType;
  const inputParentRelativePath = path.relative(inputRootPath, inputParentPath);
  const stat = await fs.stat(inputPath);
  if (stat.isFile() && (!itemType || itemType === ITEM_TYPE.LEAF)) {
    // ファイルを読み込んで返す
    const { inputEncoding = DEFAULT_TEXT_ENCODING, compileOptions } = config;
    const template = await fs.readFile(inputPath, { encoding: inputEncoding });
    const templateFn = Handlebars.compile(template, compileOptions);
    const content: string = templateFn(params);
    yield {
      content,
      result: {
        inputItemType: ITEM_TYPE.LEAF,
        inputPath,
        inputParentPath,
        inputParentRelativePath,
        inputRootPath,
        inputItem,
        inputContentType: CONTENT_TYPE.TEXT,
        inputEncoding: inputEncoding,
        isNew: true,
      },
    };
  } else {
    if (!itemType || itemType === ITEM_TYPE.NODE) {
      yield {
        result: {
          inputItemType: ITEM_TYPE.NODE,
          inputPath,
          inputParentPath,
          inputParentRelativePath,
          inputRootPath,
          inputItem,
          isNew: true,
        },
      };
    }
    // 配下のディレクトリ、ファイルを再帰的に処理
    const items = await fs.readdir(inputPath);
    for (const item of items) {
      const itemPath = path.join(inputPath, item);
      // 子要素を処理
      yield* readTemplates(itemPath, inputPath, item, config, params, inputRootPath, depth + 1);
    }
  }
};
