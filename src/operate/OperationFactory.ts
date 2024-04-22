import Factory from '../utils/Factory';
import throwError from '../utils/throwError';
import { Operation, OperationConfigBase } from './types';

class OperationFactory extends Factory<any> {
  create(config: OperationConfigBase): Operation<any> {
    const Class = this.get(config.type);
    if (Class) {
      return new Class(config);
    } else {
      throwError(`Operation "${config.type}" is not found.`, config);
    }
  }
}

export default new OperationFactory();
