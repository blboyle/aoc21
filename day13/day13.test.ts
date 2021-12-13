import { input, test1, inputExpected } from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('part 1', () => {
  it.each([
    [1, test1, 17],
    [2, input, 5212],
  ])('find number of things %i', (_, input, expected) => {
    const { analysis } = player.analyseTransparentPaper({
      input,
    });
    expect(analysis).toBe(expected);
  });

  it.each([
    // [1, test1, '0'],
    [2, input, inputExpected],
  ])(
    'find number of things %i with longer paths',
    (number, input, expected) => {
      const { code } = player.analyseTransparentPaper({
        input,
      });
      expect(code).toBe(expected);
    },
  );
});
