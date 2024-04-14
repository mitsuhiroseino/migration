module.exports = [
  {
    uppercamelcase: 'Extend',
    lowercamelcase: 'extend',
    snakecase: 'EXTEND',
    description: '縦横サイズの変更(余白の追加、トリミング)',
  },
  { uppercamelcase: 'Extract', lowercamelcase: 'extract', snakecase: 'EXTRACT', description: '領域の抽出' },
  { uppercamelcase: 'Resize', lowercamelcase: 'resize', snakecase: 'RESIZE', description: '解像度の変更' },
  { uppercamelcase: 'Trim', lowercamelcase: 'trim', snakecase: 'TRIM', description: '背景色を基準にしたトリミング' },
  { uppercamelcase: 'Composite', lowercamelcase: 'composite', snakecase: 'COMPOSITE', description: '画像の合成' },
  { uppercamelcase: 'Affine', lowercamelcase: 'affine', snakecase: 'AFFINE', description: '画像の変形' },
  { uppercamelcase: 'Blur', lowercamelcase: 'blur', snakecase: 'BLUR', description: 'ぼかし' },
  {
    uppercamelcase: 'Boolean',
    lowercamelcase: 'boolean',
    snakecase: 'BOOLEAN',
    description: '指定画像とのビット演算(マスキングなどが可能)',
  },
  { uppercamelcase: 'Clahe', lowercamelcase: 'clahe', snakecase: 'CLAHE', description: '暗部の鮮明化' },
  {
    uppercamelcase: 'Convolve',
    lowercamelcase: 'convolve',
    snakecase: 'CONVOLVE',
    description: 'コンボリューション(平滑化、鮮鋭化、エッジ抽出)',
  },
  {
    uppercamelcase: 'Flatten',
    lowercamelcase: 'flatten',
    snakecase: 'FLATTEN',
    description: 'アルファチャンネルの削除',
  },
  { uppercamelcase: 'Flip', lowercamelcase: 'flip', snakecase: 'FLIP', description: '垂直方向 (上下) にミラーリング' },
  { uppercamelcase: 'Flop', lowercamelcase: 'flop', snakecase: 'FLOP', description: '水平方向 (左右) にミラーリング' },
  { uppercamelcase: 'Gamma', lowercamelcase: 'gamma', snakecase: 'GAMMA', description: 'ガンマ補正' },
  { uppercamelcase: 'Linear', lowercamelcase: 'linear', snakecase: 'LINEAR', description: 'レベル調整' },
  { uppercamelcase: 'Median', lowercamelcase: 'median', snakecase: 'MEDIAN', description: 'ノイズ除去' },
  {
    uppercamelcase: 'Modulate',
    lowercamelcase: 'modulate',
    snakecase: 'MODULATE',
    description: '明るさ、彩度、色相の回転による画像変換',
  },
  { uppercamelcase: 'Negate', lowercamelcase: 'negate', snakecase: 'NEGATE', description: 'ネガ変換' },
  {
    uppercamelcase: 'Normalise',
    lowercamelcase: 'normalise',
    snakecase: 'NORMALISE',
    description: 'コントラスト補正',
  },
  {
    uppercamelcase: 'Normalize',
    lowercamelcase: 'normalize',
    snakecase: 'NORMALIZE',
    description: 'コントラスト補正',
  },
  { uppercamelcase: 'Recomb', lowercamelcase: 'recomb', snakecase: 'RECOMB', description: 'マトリクスで組み替え' },
  { uppercamelcase: 'Rotate', lowercamelcase: 'rotate', snakecase: 'ROTATE', description: '回転' },
  { uppercamelcase: 'Sharpen', lowercamelcase: 'sharpen', snakecase: 'SHARPEN', description: '鮮明化' },
  {
    uppercamelcase: 'Threshold',
    lowercamelcase: 'threshold',
    snakecase: 'THRESHOLD',
    description: 'しきい値処理(白黒化など)',
  },
  {
    uppercamelcase: 'Unflatten',
    lowercamelcase: 'unflatten',
    snakecase: 'UNFLATTEN',
    description: '白い部分の透過(実験的機能)',
  },
  { uppercamelcase: 'Grayscale', lowercamelcase: 'grayscale', snakecase: 'GRAYSCALE', description: 'グレースケール' },
  { uppercamelcase: 'Greyscale', lowercamelcase: 'greyscale', snakecase: 'GREYSCALE', description: 'グレースケール' },
  {
    uppercamelcase: 'PipelineColorspace',
    lowercamelcase: 'pipelineColorspace',
    snakecase: 'PIPELINE_COLORSPACE',
    description: '後続処理の色空間の変更(実験的機能)',
  },
  {
    uppercamelcase: 'PipelineColourspace',
    lowercamelcase: 'pipelineColourspace',
    snakecase: 'PIPELINE_COLOURSPACE',
    description: '後続処理の色空間の変更(実験的機能)',
  },
  { uppercamelcase: 'Tint', lowercamelcase: 'tint', snakecase: 'TINT', description: '着色' },
  {
    uppercamelcase: 'ToColorspace',
    lowercamelcase: 'toColorspace',
    snakecase: 'TO_COLORSPACE',
    description: '出力カラースペースの設定',
  },
  {
    uppercamelcase: 'ToColourspace',
    lowercamelcase: 'toColourspace',
    snakecase: 'TO_COLOURSPACE',
    description: '出力カラースペースの設定',
  },
  {
    uppercamelcase: 'Bandbool',
    lowercamelcase: 'bandbool',
    snakecase: 'BANDBOOL',
    description: '全チャンネルに対するビット演算',
  },
  {
    uppercamelcase: 'EnsureAlpha',
    lowercamelcase: 'ensureAlpha',
    snakecase: 'ENSURE_ALPHA',
    description: '透明度の追加',
  },
  {
    uppercamelcase: 'ExtractChannel',
    lowercamelcase: 'extractChannel',
    snakecase: 'EXTRACT_CHANNEL',
    description: 'チャンネルの抽出(赤、緑、青、透明度いずれかの抽出)',
  },
  {
    uppercamelcase: 'JoinChannel',
    lowercamelcase: 'joinChannel',
    snakecase: 'JOIN_CHANNEL',
    description: 'チャネルの追加(2つの画像を合成した様な効果)',
  },
  {
    uppercamelcase: 'RemoveAlpha',
    lowercamelcase: 'removeAlpha',
    snakecase: 'REMOVE_ALPHA',
    description: '透明度の削除',
  },
];
