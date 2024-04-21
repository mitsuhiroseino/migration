import Factory from '../../utils/Factory';
import { Output, OutputConfigBase } from '../types';

class OutputFactory extends Factory<any> {
  create(config: OutputConfigBase): Output<any> {
    const Class = this.get(config.type);
    if (Class) {
      return new Class(config);
    } else {
      throw new Error(`Output "${config.type}" is not found.`);
    }
  }
}

export default new OutputFactory();
