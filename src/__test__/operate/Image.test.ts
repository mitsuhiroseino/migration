import fs from 'fs-extra';
import path from 'path';
import Image, { IMAGE_MANIPULATION_TYPE } from 'src/operate/Image';

describe('Image', () => {
  test('input & output', async () => {
    const content = fs.readFileSync('./src/__test__/__resources__/sea.jpg');
    const result = await Image(
      content,
      {
        manipulations: {
          type: IMAGE_MANIPULATION_TYPE.RESIZE,
          width: 80,
        },
      },
      {}
    );
    fs.writeFileSync('./src/__test__/__resources__/result.jpg', result);

    expect(result).toBeDefined();
  });
});
