import { CONTENT_TYPE } from 'src/constants';
import operate, { OPERATION_TYPE, OperationParams } from 'src/operate';
import toOperations from 'src/utils/toOperations';

describe('operate', () => {
  test('_contentType=text', async () => {
    const content = 'ABCDEFGH';
    const operations = toOperations({ type: OPERATION_TYPE.REPLACE, pattern: 'ABC', replacement: 'abc' });
    const params: OperationParams = { _contentType: CONTENT_TYPE.TEXT };

    const result = await operate(content, operations, params);

    expect(result).toEqual({ content: 'abcDEFGH', results: [operations] });
  });
});
