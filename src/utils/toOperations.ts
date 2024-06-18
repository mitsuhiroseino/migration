import { INHERITED_MANIPULATIVE_OPERATION_CONFIGS } from '../constants';
import OperationBase from '../operate/OperationBase';
import OperationFactory from '../operate/OperationFactory';
import { Operation, OperationConfig } from '../operate/types';
import { CommonConfig } from '../types';
import asArray from './asArray';
import inheritConfig from './inheritConfig';

export default function toOperations(
  operations: Operation | OperationConfig | (Operation | OperationConfig)[],
  config?: CommonConfig,
): Operation[] {
  return asArray(operations).map((operation) => {
    if (operation instanceof OperationBase) {
      return operation;
    } else {
      return OperationFactory.create(inheritConfig(operation, config, INHERITED_MANIPULATIVE_OPERATION_CONFIGS));
    }
  });
}
