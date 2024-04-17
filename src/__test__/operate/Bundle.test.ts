import fs from 'fs-extra';
import Bundle from 'src/operate/Bundle';

describe('Bundle', () => {
  test('input & output', async () => {
    const content = fs.readFileSync('./src/__test__/__resources__/sea.jpg');
    const result = await Bundle(
      content,
      {
        operations: {
          type: 'add',
          inputEncoding: 'base64',
        },
      },
      {},
    );
    fs.writeFileSync('./src/__test__/__resources__/result.jpg', result);

    expect(result).toBeDefined();
  });
});
