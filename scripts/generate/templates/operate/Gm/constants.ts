/**
 * 出力画像フォーマット
 */
export const GM_OUTPUT_FORMAT = {
    BMP: 'bmp',
    GIF: 'gif',
    JPEG: 'jpeg',
    PNG: 'png',
    TIFF: 'tiff',
  } as const;

/**
 * 画像に対する操作
 */
export const GM_MANIPULATION_TYPE = {
{{#each manipulations}}
  /**
   * {{{this.name}}}
   *
   * {{{this.description}}}
   *
   * http://www.graphicsmagick.org/GraphicsMagick.html#details-{{{this.lowercamelcase}}}
   */
  {{this.snakecase}}: '{{this.lowercamelcase}}',

{{/each}}
} as const;
