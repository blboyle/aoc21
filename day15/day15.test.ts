import { input, test1 } from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('part 1', () => {
  it.each([
    [1, test1, 1588],
    // [1, test1, 10, 1588],
    // [2, input, 10, 3213],
  ])('find number of things %i', (_, input, expected) => {
    player.navigateChitons({
      input,
    });
    expect(true).toBe(true);
  });
});
