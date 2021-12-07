import { input, test } from './fixtures';
import { Player } from '../src';

const player = new Player();

expect(true).toBe(true);

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const location =
      player.determineCheapestHorizontalPosition(test);
    expect(location).toBe(37);
  });

  it('matches the test code for part 2', () => {
    expect(true).toBe(true);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const location =
      player.determineCheapestHorizontalPosition(input);
    expect(location).toBe(359648);
  });

  it('matches the input code for part 2', () => {
    expect(true).toBe(true);
  });
});
