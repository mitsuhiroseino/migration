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
class Factory<RP, GP = RP> {
  /**
   * 管理する製品
   */
  private _products: {
    [type: string]: RP | GP;
  } = {};

  /**
   * 製品の登録
   * @param type 製品種別
   * @param products 製品
   */
  register(type: string, products: RP) {
    this._products[type] = products;
  }

  /**
   * 製品の取得
   * @param type 製品種別
   * @returns
   */
  get<T extends string>(type: T | FactoriableConfig<T>): GP {
    if (!isString(type)) {
      type = type.type;
    }
    return this._products[type] as GP;
  }
}

export default Factory;
