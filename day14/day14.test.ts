import { input, test1 } from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('part 1', () => {
  it.each([
    // [1, 'NCNBCHB'],
    [2, 'NBCCNBBBCBHCB'],
    // [3, 'NBBBCNCCNBBNBNBBCHBHHBCHB'],
    // [
    //   4,
    //   'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB',
    // ],
  ])('find number of things %i', (steps, expected) => {
    console.log('---');
    const { answer } = player.readPolymerization({
      input: test1,
      steps,
    });
    expect(answer).toBe(expected);
  });

  it.skip.each([
    // [1, test1, 1, 1588],
    // [1, test1, 10, 1588],
    // [2, input, 10, 3213],
  ])(
    'find number of things %i',
    (_, input, steps, expected) => {
      const { difference } = player.readPolymerization({
        input,
        steps,
      });
      expect(difference).toBe(expected);
    },
  );

  it.skip.each([
    // [1, test1, 40, 2188189693529],
    // [2, input, 10, ],
  ])(
    'find number of things %i',
    (_, input, steps, expected) => {
      const { difference } = player.readPolymerization({
        input,
        steps,
      });
      expect(difference).toBe(expected);
    },
  );
});
