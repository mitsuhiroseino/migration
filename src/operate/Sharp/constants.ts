/**
 * 出力画像フォーマット
 */
export const SHARP_OUTPUT_FORMAT = {
  JPEG: 'jpeg',
  PNG: 'png',
  WEBP: 'webp',
  GIF: 'gif',
  JP2: 'jp2',
  TIFF: 'tiff',
  AVIF: 'avif',
  HEIF: 'heif',
  JXL: 'jxl',
  RAW: 'raw',
} as const;

/**
 * sharpの画像に対する操作
 */
export const SHARP_MANIPULATION_TYPE = {
  // Resising images
  // https://sharp.pixelplumbing.com/api-resize

  /**
   * 縦横サイズの変更(余白の追加、トリミング)
   *
   * https://sharp.pixelplumbing.com/api-resize#extend
   */
  EXTEND: 'extend',

  /**
   * 領域の抽出
   *
   * https://sharp.pixelplumbing.com/api-resize#extract
   */
  EXTRACT: 'extract',

  /**
   * 解像度の変更
   *
   * https://sharp.pixelplumbing.com/api-resize#resize
   */
  RESIZE: 'resize',

  /**
   * 背景色を基準にしたトリミング
   *
   * https://sharp.pixelplumbing.com/api-resize#trim
   */
  TRIM: 'trim',

  // Compositing images
  // https://sharp.pixelplumbing.com/api-composite

  /**
   * 画像の合成
   *
   * https://sharp.pixelplumbing.com/api-composite#composite
   */
  COMPOSITE: 'composite',

  // Image operation
  // https://sharp.pixelplumbing.com/api-operation

  /**
   * 画像の変形
   *
   * https://sharp.pixelplumbing.com/api-operation#affine
   */
  AFFINE: 'affine',

  /**
   * ぼかし
   *
   * https://sharp.pixelplumbing.com/api-operation#blur
   */
  BLUR: 'blur',

  /**
   * 指定画像とのビット演算(マスキングなどが可能)
   *
   * https://sharp.pixelplumbing.com/api-operation#boolean
   */
  BOOLEAN: 'boolean',

  /**
   * 暗部の鮮明化
   *
   * https://sharp.pixelplumbing.com/api-operation#clahe
   */
  CLAHE: 'clahe',

  /**
   * コンボリューション(平滑化、鮮鋭化、エッジ抽出)
   *
   * https://sharp.pixelplumbing.com/api-operation#convolve
   */
  CONVOLVE: 'convolve',

  /**
   * アルファチャンネルの削除
   *
   * https://sharp.pixelplumbing.com/api-operation#flatten
   */
  FLATTEN: 'flatten',

  /**
   * 垂直方向 (上下) にミラーリング
   *
   * https://sharp.pixelplumbing.com/api-operation#flip
   */
  FLIP: 'flip',

  /**
   * 水平方向 (左右) にミラーリング
   *
   * https://sharp.pixelplumbing.com/api-operation#flop
   */
  FLOP: 'flop',

  /**
   * ガンマ補正
   *
   * https://sharp.pixelplumbing.com/api-operation#gamma
   */
  GAMMA: 'gamma',

  /**
   * レベル調整
   *
   * https://sharp.pixelplumbing.com/api-operation#linear
   */
  LINEAR: 'linear',

  /**
   * ノイズ除去
   *
   * https://sharp.pixelplumbing.com/api-operation#median
   */
  MEDIAN: 'median',

  /**
   * 明るさ、彩度、色相の回転による画像変換
   *
   * https://sharp.pixelplumbing.com/api-operation#modulate
   */
  MODULATE: 'modulate',

  /**
   * ネガ変換
   *
   * https://sharp.pixelplumbing.com/api-operation#negate
   */
  NEGATE: 'negate',

  /**
   * コントラスト補正
   *
   * https://sharp.pixelplumbing.com/api-operation#normalise
   */
  NORMALISE: 'normalise',

  /**
   * コントラスト補正
   *
   * https://sharp.pixelplumbing.com/api-operation#normalize
   */
  NORMALIZE: 'normalize',

  /**
   * マトリクスで組み替え
   *
   * https://sharp.pixelplumbing.com/api-operation#recomb
   */
  RECOMB: 'recomb',

  /**
   * 回転
   *
   * https://sharp.pixelplumbing.com/api-operation#rotate
   */
  ROTATE: 'rotate',

  /**
   * 鮮明化
   *
   * https://sharp.pixelplumbing.com/api-operation#sharpen
   */
  SHARPEN: 'sharpen',

  /**
   * しきい値処理(白黒化など)
   *
   * https://sharp.pixelplumbing.com/api-operation#threshold
   */
  THRESHOLD: 'threshold',

  /**
   * 白い部分の透過(実験的機能)
   *
   * https://sharp.pixelplumbing.com/api-operation#unflatten
   */
  UNFLATTEN: 'unflatten',

  // Colout manipulation
  // https://sharp.pixelplumbing.com/api-colour

  /**
   * グレースケール
   *
   * https://sharp.pixelplumbing.com/api-colour#grayscale
   */
  GRAYSCALE: 'grayscale',

  /**
   * グレースケール
   *
   * https://sharp.pixelplumbing.com/api-colour#greyscale
   */
  GREYSCALE: 'greyscale',

  /**
   * 後続処理の色空間の変更(実験的機能)
   *
   * https://sharp.pixelplumbing.com/api-colour#pipelinecolorspace
   */
  PIPELINE_COLORSPACE: 'pipelineColorspace',

  /**
   * 後続処理の色空間の変更(実験的機能)
   *
   * https://sharp.pixelplumbing.com/api-colour#pipelinecolourspace
   */
  PIPELINE_COLOURSPACE: 'pipelineColourspace',

  /**
   * 着色
   *
   * https://sharp.pixelplumbing.com/api-colour#tint
   */
  TINT: 'tint',

  /**
   * 出力カラースペースの設定
   *
   * https://sharp.pixelplumbing.com/api-colour#tocolorspace
   */
  TO_COLORSPACE: 'toColorspace',

  /**
   * 出力カラースペースの設定
   *
   * https://sharp.pixelplumbing.com/api-colour#tocolourspace
   */
  TO_COLOURSPACE: 'toColourspace',

  // Channel manipulation
  // https://sharp.pixelplumbing.com/api-channel

  /**
   * 全チャンネルに対するビット演算
   *
   * https://sharp.pixelplumbing.com/api-channel#bandbool
   */
  BANDBOOL: 'bandbool',

  /**
   * 透明度の追加
   *
   * https://sharp.pixelplumbing.com/api-channel#ensurealpha
   */
  ENSURE_ALPHA: 'ensureAlpha',

  /**
   * チャンネルの抽出(赤、緑、青、透明度いずれかの抽出)
   *
   * https://sharp.pixelplumbing.com/api-channel#extractchannel
   */
  EXTRACT_CHANNEL: 'extractChannel',

  /**
   * チャネルの追加(2つの画像を合成した様な効果)
   *
   * https://sharp.pixelplumbing.com/api-channel#joinchannel
   */
  JOIN_CHANNEL: 'joinChannel',

  /**
   * 透明度の削除
   *
   * https://sharp.pixelplumbing.com/api-channel#removealpha
   */
  REMOVE_ALPHA: 'removeAlpha',
};
