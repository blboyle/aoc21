import { input, test } from './fixtures';
import { Player, Submarine } from '../src';

const sub = new Submarine();
const player = new Player();

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const lineList =
      sub.createHydrothermalVentLineList(test);
    player.reviewHydrothermalVentLineList({ lineList });
    const { numberOfOverlaps } = player;
    expect(numberOfOverlaps).toBe(5);
  });

  it('matches the test code for part 2', () => {
    const lineList =
      sub.createHydrothermalVentLineList(test);
    player.reviewHydrothermalVentLineList({
      lineList,
      includeDiagonals: true,
    });
    const { numberOfOverlaps } = player;
    expect(numberOfOverlaps).toBe(12);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const lineList =
      sub.createHydrothermalVentLineList(input);
    player.reviewHydrothermalVentLineList({ lineList });
    const { numberOfOverlaps } = player;
    expect(numberOfOverlaps).toBe(4873);
  });

  it('matches the input code for part 2', () => {
    const lineList =
      sub.createHydrothermalVentLineList(input);
    player.reviewHydrothermalVentLineList({
      lineList,
      includeDiagonals: true,
    });
    const { numberOfOverlaps } = player;
    expect(numberOfOverlaps).toBe(19472);
  });
});
