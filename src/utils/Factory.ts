import isString from 'lodash/isString';

export type FactoriableConfig<T> = {
  /**
   * 種別
   */
  type: T;
};

/**
 * 簡易ファクトリー
 */
class Factory<P> {
  /**
   * 管理する製品
   */
  protected _products: {
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
  get<T extends string>(type: T | FactoriableConfig<T>): P {
    if (!isString(type)) {
      type = type.type;
    }
    return this._products[type] as P;
  }
}

export default Factory;
