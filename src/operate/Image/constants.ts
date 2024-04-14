/**
 * 出力画像フォーマット
 */
export const IMAGE_OUTPUT_FORMAT = {
  BMP: 'bmp',
  GIF: 'gif',
  JPEG: 'jpeg',
  PNG: 'png',
  TIFF: 'tiff',
} as const;

/**
 * 画像に対する操作
 */
export const IMAGE_MANIPULATION_TYPE = {
  /**
   * ブール関数を使用して複数の画像を1つに結合する
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-blit
   */
  BLIT: 'blit',

  /**
   * ぼかし
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-blur
   */
  BLUR: 'blur',

  /**
   * 色の調整
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-color
   */
  COLOR: 'color',

  /**
   * アスペクト比を維持しつつ指定された幅と高さに収まるように拡大／縮小する
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-contain
   */
  CONTAIN: 'contain',

  /**
   * アスペクト比を維持しつつ指定された幅と高さを満たして表示されるよう拡大／縮小する
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-cover
   */
  COVER: 'cover',

  /**
   * 画像を歪ませる
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-displace
   */
  DISPLACE: 'displace',

  /**
   * ノイズ
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-dither
   */
  DITHER: 'dither',

  /**
   * 水平または垂直に反転する
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-flip
   */
  FLIP: 'flip',

  /**
   * ガウスぼかし
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-gaussian
   */
  GAUSSIAN: 'gaussian',

  /**
   * 色の反転
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-invert
   */
  INVERT: 'invert',

  /**
   * マスク
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-mask
   */
  MASK: 'mask',

  /**
   * 色の正規化
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-normalize
   */
  NORMALIZE: 'normalize',

  /**
   * 文字の描画
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-print
   */
  PRINT: 'print',

  /**
   * リサイズ
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-resize
   */
  RESIZE: 'resize',

  /**
   * 回転
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-rotate
   */
  ROTATE: 'rotate',

  /**
   * 拡大／縮小
   *
   * https://github.com/jimp-dev/jimp/tree/main/packages/plugin-scale
   */
  SCALE: 'scale',
} as const;
