import {
  input,
  test1,
  inputExpected,
  testExpected,
} from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('part 1', () => {
  it.each([
    [1, test1, 17],
    [2, input, 942],
  ])('find number of things %i', (_, input, expected) => {
    const { countOfDots } = player.analyseTransparentPaper({
      input,
      folds: 1,
    });
    expect(countOfDots).toBe(expected);
  });

  it.each([
    [1, test1, testExpected],
    [2, input, inputExpected],
  ])(
    'find number of things %i with longer paths',
    (number, input, expected) => {
      const { code } = player.analyseTransparentPaper({
        input,
        folds: false,
      });
      expect(code).toBe(expected);
    },
  );
});
