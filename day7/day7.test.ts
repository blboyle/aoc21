import { input, test } from './fixtures';
import { Player } from '../src';

const player = new Player();

expect(true).toBe(true);

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const location =
      player.determineCheapestHorizontalPosition({
        input: test,
        fuelCostMethod: 'consistent',
      });
    expect(location).toBe(37);
  });

  it('matches the test code for part 2', () => {
    const location =
      player.determineCheapestHorizontalPosition({
        input: test,
        fuelCostMethod: 'linear',
      });
    expect(location).toBe(168);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const location =
      player.determineCheapestHorizontalPosition({
        input,
        fuelCostMethod: 'consistent',
      });
    expect(location).toBe(359648);
  });

  it('matches the input code for part 2', () => {
    const location =
      player.determineCheapestHorizontalPosition({
        input,
        fuelCostMethod: 'linear',
      });
    expect(location).toBe(100727924);
  });
});
