import { input, test } from './fixtures';
import { Player, Submarine } from '../src';

const sub = new Submarine();
const player = new Player();

const checkVentsForOverlap = (
  string,
  includeDiagonals = false,
) => {
  const lineList =
    sub.createHydrothermalVentLineList(string);
  return player.reviewHydrothermalVentLineList({
    lineList,
    includeDiagonals,
  });
};

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const overlapCount = checkVentsForOverlap(test);
    expect(overlapCount).toBe(5);
  });

  it('matches the test code for part 2', () => {
    const overlapCount = checkVentsForOverlap(test, true);
    expect(overlapCount).toBe(12);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const overlapCount = checkVentsForOverlap(input);
    expect(overlapCount).toBe(4873);
  });

  it('matches the input code for part 2', () => {
    const overlapCount = checkVentsForOverlap(input, true);
    expect(overlapCount).toBe(19472);
  });
});
