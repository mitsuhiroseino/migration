/**
 * 簡易ファクトリー
 */
class Factory<P> {
  /**
   * 管理する製品
   */
  private _products: {
    [type: string]: P;
  } = {};

  /**
   * 製品の登録
   * @param type 製品種別
   * @param products 製品
   */
  register(type: string, products: P) {
    this._products[type] = products;
  }

  /**
   * 製品の取得
   * @param type 製品種別
   * @returns
   */
  get(type: string): P {
    return this._products[type];
  }
}

export default Factory;
