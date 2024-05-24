import jsPlugin from '@eslint/js';
import prettierPlugin from 'eslint-config-prettier';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['src/**', 'scripts/**'],
    ignores: ['build/**', 'node_modules/**'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  // prettierと競合するlint対応
  prettierPlugin,
  // コンフィグファイルはlintから除外
  { ignores: ['*.config.{js,mjs,ts}'] },
  {
    rules: {
      noExplicitAny: false,
    },
  },
];
