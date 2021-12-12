import { input, test1, test2, test3 } from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('part 1', () => {
  it.each([
    [1, test1, 10],
    [2, test2, 19],
    [3, test3, 226],
    [3, input, 5212],
  ])('find number of things %i', (_, input, expected) => {
    const paths = player.findPaths({ input });
    expect(paths).toBe(expected);
  });

  it.each([
    [1, test1, 36],
    [2, test2, 103],
    [3, test3, 3509],
    [4, input, 134862],
  ])(
    'find number of things %i with longer paths',
    (number, input, expected) => {
      const paths = player.findPaths({
        input,
        double: true,
      });
      expect(paths).toBe(expected);
    },
  );
});
