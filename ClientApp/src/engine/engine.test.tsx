import Engine from './engine';

it('engine returns the 4', () => {
  const expected = 4;
  const result = new Engine().run<number>('return 4;');
  expect(result).toEqual(expected);
});
