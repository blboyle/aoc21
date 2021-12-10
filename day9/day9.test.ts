import { input, test } from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const { riskLevel } = player.readHeightMap({
      input: test,
    });
    expect(riskLevel).toBe(15);
  });

  it('matches the test code for part 2', () => {
    const { topThreeBasinProduct } = player.readHeightMap({
      input: test,
    });
    expect(topThreeBasinProduct).toBe(1134);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const { riskLevel } = player.readHeightMap({ input });
    expect(riskLevel).toBe(518);
  });

  it('matches the input code for part 2', () => {
    const { topThreeBasinProduct } = player.readHeightMap({
      input,
    });
    expect(topThreeBasinProduct).toBe(949905);
  });
});
