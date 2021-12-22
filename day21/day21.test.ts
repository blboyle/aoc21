import { test, input } from './fixtures';

import { Game } from '../src/Dirac/Game';

describe('testing', () => {
  describe('part one', () => {
    it.skip.each([
      [739785, true, test],
      [1004670, true, input],
    ])(
      '%i enchancements gives %i lit lights',
      (expected, isDeterministic, input) => {
        const { answer } = new Game({
          max: 1000,
          input,
          isDeterministic,
        });

        expect(answer).toBe(expected);
      },
    );
  });

  describe('part two ', () => {
    it.only.each([
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
