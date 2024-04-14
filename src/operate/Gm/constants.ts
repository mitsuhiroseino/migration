/**
 * 入力画像フォーマット
 */
export const GM_INPUT_FORMAT = {
  ART: 'art',
  AVIF: 'avif',
  AVS: 'avs',
  BMP: 'bmp',
  CALS: 'cals',
  CIN: 'cin',
  CGM: 'cgm',
  CMYK: 'cmyk',
  CUR: 'cur',
  CUT: 'cut',
  DCM: 'dcm',
  DCX: 'dcx',
  DIB: 'dib',
  DPX: 'dpx',
  EMF: 'emf',
  EPDF: 'epdf',
  EPI: 'epi',
  EPS: 'eps',
  EPSF: 'epsf',
  EPSI: 'epsi',
  EPT: 'ept',
  FAX: 'fax',
  FIG: 'fig',
  FITS: 'fits',
  FPX: 'fpx',
  GIF: 'gif',
  GRAY: 'gray',
  GRAYA: 'graya',
  HEIF: 'heif',
  HPGL: 'hpgl',
  HTML: 'html',
  ICO: 'ico',
  JBIG: 'jbig',
  JNG: 'jng',
  JP2: 'jp2',
  JPC: 'jpc',
  JPEG: 'jpeg',
  JXL: 'jxl',
  MAN: 'man',
  MAT: 'mat',
  MIFF: 'miff',
  MONO: 'mono',
  MNG: 'mng',
  MPEG: 'mpeg',
  M2V: 'm2v',
  MPC: 'mpc',
  MSL: 'msl',
  MTV: 'mtv',
  MVG: 'mvg',
  OTB: 'otb',
  P7: 'p7',
  PALM: 'palm',
  PAM: 'pam',
  PBM: 'pbm',
  PCD: 'pcd',
  PCDS: 'pcds',
  PCX: 'pcx',
  PDB: 'pdb',
  PDF: 'pdf',
  PFA: 'pfa',
  PFB: 'pfb',
  PGM: 'pgm',
  PICON: 'picon',
  PICT: 'pict',
  PIX: 'pix',
  PNG: 'png',
  PNM: 'pnm',
  PPM: 'ppm',
  PS: 'ps',
  PS2: 'ps2',
  PS3: 'ps3',
  PSD: 'psd',
  PTIF: 'ptif',
  PWP: 'pwp',
  RAS: 'ras',
  RAD: 'rad',
  RGB: 'rgb',
  RGBA: 'rgba',
  RLA: 'rla',
  RLE: 'rle',
  SCT: 'sct',
  SFW: 'sfw',
  SGI: 'sgi',
  SUN: 'sun',
  SVG: 'svg',
  TGA: 'tga',
  TIFF: 'tiff',
  TIM: 'tim',
  TTF: 'ttf',
  TXT: 'txt',
  UYVY: 'uyvy',
  VICAR: 'vicar',
  VIFF: 'viff',
  WBMP: 'wbmp',
  WebP: 'webp',
  WPG: 'wpg',
  XBM: 'xbm',
  XCF: 'xcf',
  XPM: 'xpm',
  XWD: 'xwd',
  YUV: 'yuv',
} as const;

/**
 * 出力画像フォーマット
 */
export const GM_OUTPUT_FORMAT = {
  ART: 'art',
  AVS: 'avs',
  BMP: 'bmp',
  CMYK: 'cmyk',
  DCX: 'dcx',
  DIB: 'dib',
  DPX: 'dpx',
  EPDF: 'epdf',
  EPI: 'epi',
  EPS: 'eps',
  EPS2: 'eps2',
  EPS3: 'eps3',
  EPSF: 'epsf',
  EPSI: 'epsi',
  EPT: 'ept',
  FAX: 'fax',
  FITS: 'fits',
  FPX: 'fpx',
  GIF: 'gif',
  GRAY: 'gray',
  GRAYA: 'graya',
  HTML: 'html',
  JBIG: 'jbig',
  JNG: 'jng',
  JP2: 'jp2',
  JPC: 'jpc',
  JPEG: 'jpeg',
  JXL: 'jxl',
  MAT: 'mat',
  MIFF: 'miff',
  MONO: 'mono',
  MNG: 'mng',
  MPEG: 'mpeg',
  M2V: 'm2v',
  MPC: 'mpc',
  MSL: 'msl',
  MTV: 'mtv',
  MVG: 'mvg',
  OTB: 'otb',
  P7: 'p7',
  PALM: 'palm',
  PAM: 'pam',
  PBM: 'pbm',
  PCD: 'pcd',
  PCDS: 'pcds',
  PCL: 'pcl',
  PCX: 'pcx',
  PDB: 'pdb',
  PDF: 'pdf',
  PGM: 'pgm',
  PICON: 'picon',
  PICT: 'pict',
  PNG: 'png',
  PNM: 'pnm',
  PPM: 'ppm',
  PS: 'ps',
  PS2: 'ps2',
  PS3: 'ps3',
  PSD: 'psd',
  PTIF: 'ptif',
  RGB: 'rgb',
  RGBA: 'rgba',
  SGI: 'sgi',
  SHTML: 'shtml',
  SUN: 'sun',
  SVG: 'svg',
  TGA: 'tga',
  TIFF: 'tiff',
  TXT: 'txt',
  UIL: 'uil',
  UYVY: 'uyvy',
  VICAR: 'vicar',
  VIFF: 'viff',
  WBMP: 'wbmp',
  WebP: 'webp',
  XBM: 'xbm',
  XPM: 'xpm',
  XWD: 'xwd',
  YUV: 'yuv',
} as const;

/**
 * 画像に対する操作
 */
export const GM_MANIPULATION_TYPE = {
  /**
   * 画像の結合
   *
   * 複数の画像を一つの画像に結合することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-adjoin
   */
  ADJOIN: 'adjoin',

  /**
   * アフィン変換
   *
   * 画像にアフィン変換を適用することができる。平行移動、回転、スケーリング、シアーなどの変換が可能である。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-affine
   */
  AFFINE: 'affine',

  /**
   * アンチエイリアス処理
   *
   * 画像のアンチエイリアス処理を行うことができる。エッジや線を滑らかにすることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-antialias
   */
  ANTIALIAS: 'antialias',

  /**
   * 画像の連結
   *
   * 複数の画像を連結して一つの画像にすることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-append
   */
  APPEND: 'append',

  /**
   * 認証
   *
   * 画像の認証を行うことができる。特定の画像が正当であるかどうかを確認できる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-authenticate
   */
  AUTHENTICATE: 'authenticate',

  /**
   * 自動方向転換
   *
   * 画像の向きを自動的に修正することができる。例えば、Exif情報に基づいて画像を正しい向きに回転させることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-autoOrient
   */
  AUTO_ORIENT: 'autoOrient',

  /**
   * 平均値算出
   *
   * 複数の画像の平均値を計算することができる。統計情報の取得や複数の画像をブレンドするのに使用できる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-average
   */
  AVERAGE: 'average',

  /**
   * 背景画像
   *
   * 画像の背景を指定した画像に設定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-backdrop
   */
  BACKDROP: 'backdrop',

  /**
   * 背景色
   *
   * 背景を設定することができる。画像に背景色を追加する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-background
   */
  BACKGROUND: 'background',

  /**
   * ビット深度
   *
   * 画像のビット深度を変更することができる。色の表現精度を調整することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-bitdepth
   */
  BITDEPTH: 'bitdepth',

  /**
   * 黒のしきい値
   *
   * 画像の黒色の閾値を設定することができる。指定された閾値より暗いピクセルを黒色として扱うことができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-blackThreshold
   */
  BLACK_THRESHOLD: 'blackThreshold',

  /**
   * 青の主要成分
   *
   * 画像の青のプライマリ値を設定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-bluePrimary
   */
  BLUE_PRIMARY: 'bluePrimary',

  /**
   * ぼかし
   *
   * 画像にぼかしを適用することができる。これにより、画像のエッジが滑らかになり、ノイズが軽減される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-blur
   */
  BLUR: 'blur',

  /**
   * 境界線
   *
   * 画像に境界線を追加することができる。境界線は、画像の周囲にフレームを付けるのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-border
   */
  BORDER: 'border',

  /**
   * 境界線色
   *
   * 境界線の色を設定することができる。境界線の色は、画像に追加されるフレームの色を指定するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-borderColor
   */
  BORDER_COLOR: 'borderColor',

  /**
   * ボックスフィルタ
   *
   * 画像にボックスフィルタを適用することができる。ボックスフィルタは、画像をぼかすのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-box
   */
  BOX: 'box',

  /**
   * チャンネル操作
   *
   * 画像の特定のチャンネルを操作することができる。RGBやCMYKなどのチャンネルに対して、異なる処理を適用することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-channel
   */
  CHANNEL: 'channel',

  /**
   * 木炭効果
   *
   * 画像に木炭効果を適用することができる。木炭効果は、画像に粗い質感を与えるのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-charcoal
   */
  CHARCOAL: 'charcoal',

  /**
   * 切り取り
   *
   * 画像から指定された範囲を切り取ることができる。指定された範囲外の部分が削除される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-chop
   */
  CHOP: 'chop',

  /**
   * クリップ
   *
   * 画像をクリッピングすることができる。指定された範囲内のピクセルのみが残り、それ以外のピクセルは削除される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-clip
   */
  CLIP: 'clip',

  /**
   * アニメーション
   *
   * 複数の画像を連結することができる。複数の画像を連結して一つのアニメーション画像にする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-coalesce
   */
  COALESCE: 'coalesce',

  /**
   * 着色
   *
   * 画像に色を付けることができる。画像全体または指定された領域に色を塗ることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-colorize
   */
  COLORIZE: 'colorize',

  /**
   * カラーマップ
   *
   * 画像の色をマッピングすることができる。指定されたカラーマップに基づいて、画像の色を変換する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-colorMap
   */
  COLOR_MAP: 'colorMap',

  /**
   * 色数変更
   *
   * 画像の色数を変更することができる。色数の変更により、画像の色の表現を調整することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-colors
   */
  COLORS: 'colors',

  /**
   * カラースペース変更
   *
   * 画像のカラースペースを変更することができる。RGB、CMYK、グレースケールなどのカラースペースに変換することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-colorspace
   */
  COLORSPACE: 'colorspace',

  /**
   * 合成
   *
   * 複数の画像を合成することができる。合成モードや透明度などのパラメータを指定して、複数の画像を組み合わせることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-compose
   */
  COMPOSE: 'compose',

  /**
   * 合成
   *
   * 画像を合成することができる。複数の画像を組み合わせて1枚の画像を作成する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-composite
   */
  COMPOSITE: 'composite',

  /**
   * 圧縮
   *
   * 画像を圧縮することができる。圧縮率や圧縮形式を指定して、画像ファイルのサイズを減らすことができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-compress
   */
  COMPRESS: 'compress',

  /**
   * コントラスト調整
   *
   * 画像のコントラストを調整することができる。コントラストの調整により、画像の明るさと暗さの差を強調することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-contrast
   */
  CONTRAST: 'contrast',

  /**
   * 畳み込みフィルタ
   *
   * 画像に畳み込みフィルタを適用することができる。畳み込みフィルタを使用することで、画像の特徴を強調したり、ノイズを除去したりすることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-convolve
   */
  CONVOLVE: 'convolve',

  /**
   * 切り抜き
   *
   * 画像を指定された範囲で切り取ることができる。指定された範囲外の部分が削除される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-crop
   */
  CROP: 'crop',

  /**
   * サイクル
   *
   * 画像を指定された回数だけ複製して連結することができる。アニメーションのループなどに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-cycle
   */
  CYCLE: 'cycle',

  /**
   * 色成分の分解
   *
   * 画像の色を成分ごとに分解することができる。RGBやCMYKなどの成分を個別に操作するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-deconstruct
   */
  DECONSTRUCT: 'deconstruct',

  /**
   * パラメータ定義
   *
   * 画像処理に関する設定やパラメータを定義することができる。処理の挙動や結果を細かく調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-define
   */
  DEFINE: 'define',

  /**
   * 遅延設定
   *
   * アニメーション画像のフレーム間の遅延を設定することができる。各フレームの表示時間を制御する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-delay
   */
  DELAY: 'delay',

  /**
   * 解像度
   *
   * 画像の解像度や密度を設定することができる。印刷や表示における画像の品質を調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-density
   */
  DENSITY: 'density',

  /**
   * スペックルノイズ除去
   *
   * 画像からスペックルノイズを除去することができる。画像のクリーンアップや改善に使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-despeckle
   */
  DESPECKLE: 'despeckle',

  /**
   * ピクセル変位
   *
   * 画像のピクセルを指定されたマップに基づいて変位させることができる。歪みや効果を与えるのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-displace
   */
  DISPLACE: 'displace',

  /**
   * 後処理
   *
   * アニメーション画像の各フレームの後処理方法を設定することができる。フレームの間のトランジションやクリア方法などを指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-dispose
   */
  DISPOSE: 'dispose',

  /**
   * トランジション
   *
   * 画像同士を指定された割合で混合することができる。トランジションやフェードイン/フェードアウトのエフェクトを作成するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-dissolve
   */
  DISSOLVE: 'dissolve',

  /**
   * 減色
   *
   * 画像の色を減色することができる。色数を減らすことで画像を効果的に圧縮するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-dither
   */
  DITHER: 'dither',

  /**
   * エッジ検出
   *
   * 画像のエッジを検出することができる。エッジ検出により、画像の輪郭を強調することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-edge
   */
  EDGE: 'edge',

  /**
   * エンボス効果
   *
   * 画像に浮き出し効果を与えることができる。画像に立体感や質感を与えるのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-emboss
   */
  EMBOSS: 'emboss',

  /**
   * エンコーディング指定
   *
   * 画像のエンコード方法や形式を指定することができる。画像のファイル形式や圧縮方法を設定するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-encoding
   */
  ENCODING: 'encoding',

  /**
   * エンディアン
   *
   * 画像のバイトオーダーを設定することができる。エンディアンの変更により、画像の解釈や表示が変わることがある。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-endian
   */
  ENDIAN: 'endian',

  /**
   * 鮮明度、色彩、コントラスト調整
   *
   * 画像の品質を向上させることができる。画像の鮮明度、色彩、コントラストなどを調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-enhance
   */
  ENHANCE: 'enhance',

  /**
   * ヒストグラム均等化
   *
   * 画像のヒストグラムを均等化することができる。ヒストグラム均等化により、画像のコントラストを向上させることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-equalize
   */
  EQUALIZE: 'equalize',

  /**
   * サイズ変更
   *
   * 画像のサイズを変更することができる。指定されたサイズにリサイズするか、余白を追加してサイズを変更する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-extent
   */
  EXTENT: 'extent',

  /**
   * フィルタ
   *
   * 画像にフィルター処理を適用することができる。ぼかし、シャープ化、輪郭強調などのさまざまなエフェクトを実現することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-filter
   */
  FILTER: 'filter',

  /**
   * レイヤー統合
   *
   * 画像のレイヤーを平坦化することができる。複数の画像レイヤーを一つの画像に結合する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-flatten
   */
  FLATTEN: 'flatten',

  /**
   * 上下反転
   *
   * 画像を上下に反転させることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-flip
   */
  FLIP: 'flip',

  /**
   * 左右反転
   *
   * 画像を左右に反転させることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-flop
   */
  FLOP: 'flop',

  /**
   * 前景色
   *
   * 画像に前景色を指定することができる。文字や形状の描画などに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-foreground
   */
  FOREGROUND: 'foreground',

  /**
   * 枠線追加
   *
   * 画像に枠線を追加することができる。指定した色や太さで画像を枠で囲む。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-frame
   */
  FRAME: 'frame',

  /**
   * ぼかし
   *
   * 画像の色の許容範囲を指定することができる。指定した色と近い色を同一視することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-fuzz
   */
  FUZZ: 'fuzz',

  /**
   * ガンマ補正
   *
   * 画像のガンマ補正を行うことができる。画像の明るさやコントラストを調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-gamma
   */
  GAMMA: 'gamma',

  /**
   * ガウシアンぼかし
   *
   * 画像にガウシアンぼかしを適用することができる。ガウシアンぼかしは、画像のエッジを滑らかにするのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-gaussian
   */
  GAUSSIAN: 'gaussian',

  /**
   * 幅、高さ、位置調整
   *
   * 画像の幅や高さ、位置を指定することができる。画像のサイズや配置を調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-geometry
   */
  GEOMETRY: 'geometry',

  /**
   * 緑の主要成分
   *
   * 画像の緑のプライマリ値を設定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-greenPrimary
   */
  GREEN_PRIMARY: 'greenPrimary',

  /**
   * 画像揃え基準点指定
   *
   * 画像の揃える基準点を指定することができる。画像の配置や重心を制御するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-gravity
   */
  GRAVITY: 'gravity',

  /**
   * ハイライトの色
   *
   * 画像のハイライト色を指定することができる。ハイライトの色や強度を調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-highlightColor
   */
  HIGHLIGHT_COLOR: 'highlightColor',

  /**
   * ハイライトのスタイル
   *
   * 画像のハイライトのスタイルを指定することができる。ハイライトのスタイルや効果を変更するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-highlightStyle
   */
  HIGHLIGHT_STYLE: 'highlightStyle',

  /**
   * アイコンのジオメトリ
   *
   * アイコンのサイズや配置を指定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-iconGeometry
   */
  ICON_GEOMETRY: 'iconGeometry',

  /**
   * 内側に収縮
   *
   * 画像を内側に収縮させることができる。画像を中心点を基準に収縮することで、効果的な視覚的効果を得ることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-implode
   */
  IMPLODE: 'implode',

  /**
   * カラー管理操作
   *
   * 画像の処理目的を指定することができる。色変換やリサイズなどの処理方法を指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-intent
   */
  INTENT: 'intent',

  /**
   * インターレース
   *
   * 画像のインターレース形式を設定することができる。プログレッシブ表示やインターレース表示などの方法を指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-interlace
   */
  INTERLACE: 'interlace',

  /**
   * ラベル
   *
   * 画像にラベルを追加することができる。画像にテキストや注釈を付けるのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-label
   */
  LABEL: 'label',

  /**
   * ローカル適応しきい値処理
   *
   * 指定された幅、高さ、オフセットを使用して、ローカル適応しきい値処理を実行する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-lat
   */
  LAT: 'lat',

  /**
   * コントラストレベル調整
   *
   * 画像のレベルを調整することができる。色の範囲を変更することで、コントラストや明るさを調整する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-level
   */
  LEVEL: 'level',

  /**
   * リソース制限
   *
   * 画像処理に対するリソースの制限を設定することができる。メモリやCPUの使用量、処理速度などを制御する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-limit
   */
  LIMIT: 'limit',

  /**
   * リスト
   *
   * 画像ファイルや画像の属性をリストアップすることができる。画像のメタデータやファイル情報を取得するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-list
   */
  LIST: 'list',

  /**
   * ログ
   *
   * 画像処理のログを記録することができる。処理の進捗やエラーなどを記録するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-log
   */
  LOG: 'log',

  /**
   * ループ
   *
   * 画像のアニメーションループを設定することができる。アニメーション画像の再生回数やループの制御を行う。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-loop
   */
  LOOP: 'loop',

  /**
   * 擬似的エッジ
   *
   * 画像のエッジを擬似的に3Dに下げる効果を作成する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-lower
   */
  LOWER: 'lower',

  /**
   * 拡大
   *
   * 画像を拡大することができる。画像のサイズを拡大して、詳細な部分を表示するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-magnify
   */
  MAGNIFY: 'magnify',

  /**
   * マップ
   *
   * 画像のピクセル値をマッピングすることができる。指定されたカラーマップに基づいて、画像の色を変換する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-map
   */
  MAP: 'map',

  /**
   * マスク
   *
   * 画像にマスクを適用することができる。指定されたマスクに基づいて、画像の一部を表示または非表示にする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-mask
   */
  MASK: 'mask',

  /**
   * マットチャネル保存
   *
   * 画像にマットチャネルがある場合は、マットチャネルを保存する。画像の透過性や形状を調整することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-matte
   */
  MATTE: 'matte',

  /**
   * マットチャネル色
   *
   * 画像のマットの色を指定することができる。マットの色や透明度を調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-matteColor
   */
  MATTE_COLOR: 'matteColor',

  /**
   * エラー最大量
   *
   * 合計画像エラーの最大量を指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-maximumError
   */
  MAXIMUM_ERROR: 'maximumError',

  /**
   * メディアンフィルター
   *
   * 画像のメディアンフィルターを適用することができる。メディアンフィルターは、画像のノイズを除去するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-median
   */
  MEDIAN: 'median',

  /**
   * 縮小
   *
   * 画像を縮小することができる。画像のサイズを縮小して、ファイルサイズを減らすことができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-minify
   */
  MINIFY: 'minify',

  /**
   * 動作モード
   *
   * 画像のモードを設定することができる。カラーモードや画像の表示形式を指定するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-mode
   */
  MODE: 'mode',

  /**
   * 明るさ、彩度、色相変更
   *
   * 画像の色相、彩度、明度を調整することができる。色のバランスや鮮やかさを調整するのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-modulate
   */
  MODULATE: 'modulate',

  /**
   * モニター
   *
   * 画像処理の進行状況を監視することができる。処理の進捗や統計情報などをリアルタイムで表示する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-monitor
   */
  MONITOR: 'monitor',

  /**
   * モノクロ
   *
   * 画像をモノクロームに変換することができる。白黒や二値化などのモノクローム処理が可能。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-monochrome
   */
  MONOCHROME: 'monochrome',

  /**
   * モンタージュ
   *
   * 画像をモンタージュすることができる。複数の画像をタイル状に並べて1枚の画像にまとめる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-montage
   */
  MONTAGE: 'montage',

  /**
   * モーフィング
   *
   * 画像間のモーフィングを行うことができる。複数の画像間で形状や特徴を変化させるのに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-morph
   */
  MORPH: 'morph',

  /**
   * モザイク
   *
   * 複数の画像をモザイク状に配置して一つの画像に結合することができる。画像のタイル表示などに使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-mosaic
   */
  MOSAIC: 'mosaic',

  /**
   * モーションブラー
   *
   * 画像にモーションブラー効果を追加することができる。画像の移動を模倣し、動きのある効果を与える。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-motionBlur
   */
  MOTION_BLUR: 'motionBlur',

  /**
   * 色の反転
   *
   * すべてのピクセルをその補色で置き換える。色の反転を行い、画像の色を反転させる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-negative
   */
  NEGATIVE: 'negative',

  /**
   * ノイズ
   *
   * 画像にノイズを追加することができる。ランダムなノイズやパターンを画像に適用し、効果を与える。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-noise
   */
  NOISE: 'noise',

  /**
   * 正規化
   *
   * 画像の色や明るさを正規化することができる。色のバランスや明るさを一定の基準に合わせる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-normalize
   */
  NORMALIZE: 'normalize',

  /**
   * 不透明
   *
   * 画像の透明部分を不透明にすることができる。透明な部分を指定された色やパターンで塗りつぶす。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-opaque
   */
  OPAQUE: 'opaque',

  /**
   * 演算子
   *
   * 画像チャネルに数学演算子、ビット演算子、または値演算子を適用する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-operator
   */
  OPERATOR: 'operator',

  /**
   * 順序付きディザリング
   *
   * 画像にオーダーディザリングを適用することができる。ディザリング効果を画像に適用し、色の表現を改善する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-orderedDither
   */
  ORDERED_DITHER: 'orderedDither',

  /**
   * キャンバスのサイズ、位置
   *
   * 画像のページサイズや配置を設定することができる。印刷やレイアウトの際に使用される。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-page
   */
  PAGE: 'page',

  /**
   * 一時停止
   *
   * アニメーション ループ間で一時停止する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-pause
   */
  PAUSE: 'pause',

  /**
   * 画像特性
   *
   * 画像の特徴を効率的に判断する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-ping
   */
  PING: 'ping',

  /**
   * ポイントサイズ
   *
   * PostScript、X11、またはTrueTypeフォントのポイントサイズ。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-pointSize
   */
  POINT_SIZE: 'pointSize',

  /**
   * プロファイル削除
   *
   * 画像からプロファイル情報を削除することができる。画像のメタデータからプロファイル情報を除去する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-noProfile
   */
  NO_PROFILE: 'noProfile',

  /**
   * プレビュー
   *
   * 画像のプレビューを生成することができる。サムネイルやプレビュー画像を生成する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-preview
   */
  PREVIEW: 'preview',

  /**
   * 油絵効果
   *
   * 油絵をシミュレートする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-paint
   */
  PAINT: 'paint',

  /**
   * プロセス
   *
   * プロセスモジュールを使用して一連の画像を処理する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-process
   */
  PROCESS: 'process',

  /**
   * プロファイル追加
   *
   * 画像にプロファイル情報を適用することができる。画像の色空間や色の表現を定義するプロファイル情報を適用する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-profile
   */
  PROFILE: 'profile',

  /**
   * 進行状況
   *
   * 画像処理の進行状況を表示することができる。処理の進捗状況や残り時間をリアルタイムで表示する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-progress
   */
  PROGRESS: 'progress',

  /**
   * ランダムしきい値
   *
   * 画像のランダムしきい値処理を行うことができる。ランダムなしきい値を使用して、画像を二値化する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-randomThreshold
   */
  RANDOM_THRESHOLD: 'randomThreshold',

  /**
   * 画像品質
   *
   * JPEG/MIFF/PNG/TIFFの圧縮レベル。圧縮率や品質レベルを調整することで、画像のファイルサイズと品質のバランスを調整する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-quality
   */
  QUALITY: 'quality',

  /**
   * 浮き出し
   *
   * 画像の端を明るくしたり暗くしたりする。指定した方向や程度で、画像の輪郭を浮き出し状にする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-raise
   */
  RAISE: 'raise',

  /**
   * 再着色
   *
   * 色変換マトリックスを画像チャンネルに適用する。指定した色やパターンで、画像の色を変更する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-recolor
   */
  RECOLOR: 'recolor',

  /**
   * 赤の主要成分
   *
   * 画像の赤のプライマリ値を設定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-redPrimary
   */
  RED_PRIMARY: 'redPrimary',

  /**
   * 領域指定
   *
   * 画像の一部にオプションを適用する。指定した範囲内の画像処理を行う。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-region
   */
  REGION: 'region',

  /**
   * レンダリング
   *
   * レンダリングベクター操作。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-render
   */
  RENDER: 'render',

  /**
   * ページ再設定
   *
   * 画像のページ設定を調整することができる。画像のページ位置やサイズを調整する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-repage
   */
  REPAGE: 'repage',

  /**
   * 拡大縮小
   *
   * ピクセルサンプリングを使用して画像を拡大縮小する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-sample
   */
  SAMPLE: 'sample',

  /**
   * クロマサブサンプリング係数
   *
   * DPX、JPEG、MPEG、またはYUVエンコーダがクロマダウンサンプリングに使用するサンプリング係数を指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-samplingFactor
   */
  SAMPLING_FACTOR: 'samplingFactor',

  /**
   * 生のサイズ
   *
   * 画像の生のサイズを指定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-rawSize
   */
  RAW_SIZE: 'rawSize',

  /**
   * 再サンプリング
   *
   * 画像を指定された水平および垂直解像度にリサンプルする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-resample
   */
  RESAMPLE: 'resample',

  /**
   * リサイズ
   *
   * 画像のリサイズを行うことができる。画像のサイズを指定した幅や高さに変更する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-resize
   */
  RESIZE: 'resize',

  /**
   * 垂直／水平回転
   *
   * 画像を垂直または水平に回転させる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-roll
   */
  ROLL: 'roll',

  /**
   * 回転
   *
   * 画像を回転させることができる。指定した角度だけ画像を回転させる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-rotate
   */
  ROTATE: 'rotate',

  /**
   * シーン番号設定
   *
   * 画像のシーン番号を設定することができる。複数のシーンが含まれる画像ファイルの特定のシーンを指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-scene
   */
  SCENE: 'scene',

  /**
   * シーン番号の範囲設定
   *
   * 画像内のシーンの範囲を指定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-scenes
   */
  SCENES: 'scenes',

  /**
   * スケール
   *
   * 画像のスケーリングを行うことができる。画像のサイズを指定した倍率で拡大縮小する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-scale
   */
  SCALE: 'scale',

  /**
   * 画像分割
   *
   * 画像をセグメント化して分割することができる。画像を領域ごとに分割し、個々の領域を処理する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-segment
   */
  SEGMENT: 'segment',

  /**
   * フレーム選択
   *
   * フレームを選択することができる。動画やGIF画像から特定のフレームを選択する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-selectFrame
   */
  SELECT_FRAME: 'selectFrame',

  /**
   * セピア
   *
   * 画像にセピア調の効果を追加することができる。古めかしい雰囲気を持つセピア色に変換する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-sepia
   */
  SEPIA: 'sepia',

  /**
   * 画像属性設定
   *
   * 画像の特定の属性を設定することができる。画像のメタデータやプロパティを設定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-set
   */
  SET: 'set',

  /**
   * フォーマット設定
   *
   * 画像のフォーマットを設定することができる。画像のファイル形式や拡張子を指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-setFormat
   */
  SET_FORMAT: 'setFormat',

  /**
   * 影
   *
   * 遠方の光源を使用して画像に影を付ける。指定した方向や強度で影を付けることができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-shade
   */
  SHADE: 'shade',

  /**
   * シャドウ
   *
   * モンタージュに影を付ける。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-shadow
   */
  SHADOW: 'shadow',

  /**
   * 共有メモリ
   *
   * 画像を共有メモリにロードすることができる。他のプロセスと画像を共有するためのメモリ領域を確保する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-sharedMemory
   */
  SHARED_MEMORY: 'sharedMemory',

  /**
   * ピクセル削除
   *
   * 画像の端からピクセルを削り取る。指定した幅や高さだけ画像の周囲を削除する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-shave
   */
  SHAVE: 'shave',

  /**
   * シャープ化
   *
   * 画像をシャープにすることができる。画像の輪郭や細部を強調することで、鮮明さを向上させる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-sharpen
   */
  SHARPEN: 'sharpen',

  /**
   * せん断
   *
   * X軸またはY軸に沿って画像をせん断する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-shear
   */
  SHEAR: 'shear',

  /**
   * コンソール出力抑止
   *
   * 画像処理の出力を抑制することができる。処理結果を出力せずに処理を行う。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-silent
   */
  SILENT: 'silent',

  /**
   * スナップショット
   *
   * Xサーバー画面から複数の画像を取得し、アニメーションシーケンスを作成する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-snaps
   */
  SNAPS: 'snaps',

  /**
   * ソラライズ
   *
   * しきい値レベルを超えるすべてのピクセルを無効にする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-solarize
   */
  SOLARIZE: 'solarize',

  /**
   * 拡散
   *
   * 画像の色やパターンを拡散させることができる。色やパターンの広がりを調整する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-spread
   */
  SPREAD: 'spread',

  /**
   * 透かし非表示
   *
   * 画像内の透かしを非表示にする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-stegano
   */
  STEGANO: 'stegano',

  /**
   * ステレオ
   *
   * 画像をステレオ視用に処理することができる。左右の画像を立体視効果として合成する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-stereo
   */
  STEREO: 'stereo',

  /**
   * プロファイル削除
   *
   * 画像からすべてのプロファイルとテキスト属性を削除する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-strip
   */
  STRIP: 'strip',

  /**
   * 渦巻き
   *
   * 画像を渦巻状に歪ませることができる。指定した中心点を中心に画像を渦巻き状に回転させる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-swirl
   */
  SWIRL: 'swirl',

  /**
   * テキストフォント指定
   *
   * 画像にテキストを追加する際のフォントを指定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-textFont
   */
  TEXT_FONT: 'textFont',

  /**
   * テクスチャ
   *
   * 画像にテクスチャを適用することができる。別の画像やパターンを用いて、画像にテクスチャを施す。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-texture
   */
  TEXTURE: 'texture',

  /**
   * しきい値
   *
   * 画像のしきい値処理を行うことができる。指定した閾値を超えるピクセルを二値化し、画像を分類する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-threshold
   */
  THRESHOLD: 'threshold',

  /**
   * サムネイル
   *
   * 画像のサイズを素早く変更する。画質よりも速度を重視。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-thumb
   */
  THUMB: 'thumb',

  /**
   * サムネイル
   *
   * 画像のサイズを素早く変更する。画質よりも速度を重視。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-thumbnail
   */
  THUMBNAIL: 'thumbnail',

  /**
   * タイル
   *
   * 画像をタイル状に並べることができる。指定したパターンや配置で画像をタイル表示する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-tile
   */
  TILE: 'tile',

  /**
   * タイトル
   *
   * タイトルを設定することができる。画像や動画にタイトルを追加する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-title
   */
  TITLE: 'title',

  /**
   * 変換
   *
   * イメージを変換する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-transform
   */
  TRANSFORM: 'transform',

  /**
   * 透明化
   *
   * 指定した色を透明化し、画像の一部を透明にする。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-transparent
   */
  TRANSPARENT: 'transparent',

  /**
   * 減色アルゴリズムのツリーの深さ
   *
   * 減色アルゴリズムのツリーの深さを指定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-treeDepth
   */
  TREE_DEPTH: 'treeDepth',

  /**
   * トリミング
   *
   * 画像から余白を自動的にトリミングすることができる。画像の周囲の余白を削除して、本来の内容を切り出す。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-trim
   */
  TRIM: 'trim',

  /**
   * タイプ
   *
   * 2値、グレースケール、パレット、トゥルーカラー、トゥルーカラー+アルファなどを指定。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-type
   */
  TYPE: 'type',

  /**
   * 解像度の単位指定
   *
   * 画像の単位を指定することができる。画像の単位をピクセル/インチ、ピクセル/センチなどで指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-units
   */
  UNITS: 'units',

  /**
   * アンシャープ
   *
   * 画像にアンシャープマスクを適用することができる。画像の鮮明度を向上させるためのフィルタリングを行う。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-unsharp
   */
  UNSHARP: 'unsharp',

  /**
   * ピクスマップの使用
   *
   * 画像の表示にピクスマップを使用するかどうかを設定することができる。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-usePixmap
   */
  USE_PIXMAP: 'usePixmap',

  /**
   * 表示パラメータ指定
   *
   * FlashPix表示パラメータ指定。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-view
   */
  VIEW: 'view',

  /**
   * 仮想ピクセル
   *
   * 仮想ピクセルの設定を行うことができる。画像の範囲外のピクセルをどのように扱うかを指定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-virtualPixel
   */
  VIRTUAL_PIXEL: 'virtualPixel',

  /**
   * ビジュアル
   *
   * このXビジュアル タイプを使用して画像をアニメーション化する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-visual
   */
  VISUAL: 'visual',

  /**
   * ウォーターマーク
   *
   * 透かしの明るさと彩度のパーセント指定。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-watermark
   */
  WATERMARK: 'watermark',

  /**
   * 正弦波
   *
   * 正弦波に沿って画像を変更する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-wave
   */
  WAVE: 'wave',

  /**
   * ホワイトポイント
   *
   * 画像のホワイトポイントを設定することができる。画像のホワイトポイントを調整する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-whitePoint
   */
  WHITE_POINT: 'whitePoint',

  /**
   * ホワイトのしきい値
   *
   * 画像のホワイトのしきい値を設定することができる。白色のピクセルとして扱うしきい値を設定する。
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-whiteThreshold
   */
  WHITE_THRESHOLD: 'whiteThreshold',
} as const;
