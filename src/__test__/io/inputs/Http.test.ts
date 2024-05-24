import Http from 'src/io/inputs/Http';

describe('Http', () => {
  test('normal', async () => {
    const input = new Http({
      type: 'http',
      url: '',
    });
    const result = await input.read({});
    expect(result).toEqual({});
  });
});
