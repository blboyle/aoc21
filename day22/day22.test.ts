import { miniTest, test, test2, input } from './fixtures';

import { Cuboid } from '../src/Cuboids/Cuboid';

describe('testing', () => {
  describe('part one', () => {
    it.only.each([
      // [590784, miniTest],
      // [590784, test],
      // [1004670, input],
      [0, test2],
    ])(
      '%i enchancements gives %i lit lights',
      (expected, input) => {
        const { answer } = new Cuboid({
          input,
        });

        expect(answer).toBe(expected);
      },
    );
  });

  describe('part two ', () => {
    it.each([
      [739785, true, test],
      // [1004670, true, input],
    ])(
      '%i enchancements gives %i lit lights',
      (expected, isDeterministic, input) => {
        const { gamesWonByWinner } = new Game({
          max: 21,
          input,
          isDeterministic: false,
        });

        expect(gamesWonByWinner).toBe(expected);
      },
    );
  });
});
