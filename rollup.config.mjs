import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import * as path from 'path';

const SRC_DIR = './src',
  INPUT = path.join(SRC_DIR, 'index.ts'),
  EXTENTIONS = ['.ts', '.js'],
  EXTENTION_CJS = 'js',
  EXTENTION_ESM = 'mjs',
  // node_modules配下のdependenciesはバンドルしない。下記の正規表現の指定をするためには'@rollup/plugin-node-resolve'が必要
  EXTERNAL = [/node_modules/, /@visue/],
  BUID_DIR = './build',
  OUTPUT = BUID_DIR,
  BABEL_CONFIG_PATH = path.resolve('babel.config.js'),
  TEST_FILE = /.+\.test\..+/;

const getConfig = (input, output, format, ext, dev = false) => ({
  // エントリーポイント
  input,
  output: {
    // 出力先ディレクトリ
    dir: output,
    format,
    exports: 'named',
    sourcemap: dev,
    entryFileNames: `[name].${ext}`,
    // バンドルしない(falseだとindex.cjsに纏められてしまう)
    preserveModules: true,
  },
  external: EXTERNAL,
  treeshake: false,
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [TEST_FILE],
      outDir: output,
      ...(dev
        ? { declaration: true, declarationMap: true, declarationDir: output, sourceMap: true }
        : { declaration: false, declarationMap: false, sourceMap: false }),
    }),
    babel({
      extensions: EXTENTIONS,
      babelHelpers: 'runtime',
      configFile: BABEL_CONFIG_PATH,
    }),
    commonjs(),
  ],
});

// commonjs用とesmodule用のソースを出力する
const config = [
  // cjs & typeのビルド
  getConfig(INPUT, OUTPUT, 'cjs', EXTENTION_CJS, true),
  // esmのビルド
  getConfig(INPUT, OUTPUT, 'es', EXTENTION_ESM),
  // gm
  getConfig(`${SRC_DIR}/operate/Gm/index.ts`, BUID_DIR, 'cjs', EXTENTION_CJS),
  // gm
  getConfig(`${SRC_DIR}/operate/Gm/index.ts`, BUID_DIR, 'es', EXTENTION_ESM),
  // sharp
  getConfig(`${SRC_DIR}/operate/Sharp/index.ts`, BUID_DIR, 'cjs', EXTENTION_CJS),
  // sharp
  getConfig(`${SRC_DIR}/operate/Sharp/index.ts`, BUID_DIR, 'es', EXTENTION_ESM),
];
export default config;
