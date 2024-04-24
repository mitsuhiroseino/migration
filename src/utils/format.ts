import prettier, { Options } from 'prettier';

export type FormatOptions = Options;

export default async function format(content: string, options: FormatOptions) {
  return await prettier.format(content, options);
}
