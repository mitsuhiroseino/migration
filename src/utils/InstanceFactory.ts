import Factory, { FactoriableConfig } from './Factory';

/**
 * クラスを管理しインスタンスを取得できるファクトリー
 */
class InstanceFactory<P> extends Factory<new <T extends string>(config: FactoriableConfig<T>) => P> {
  /**
   * インスタンスの取得
   * @param config コンフィグ
   * @returns
   */
  create<T extends string>(config: FactoriableConfig<T>): P | undefined {
    const Class = this.get(config);
    if (Class) {
      return new Class(config);
    }
    return;
  }
}

export default InstanceFactory;
