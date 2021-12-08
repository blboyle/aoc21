import { input, test } from './fixtures';

import { LanternfishPool } from '../src/Laternfish/LaternfishPool';

describe('my tests', () => {
  it('testing stufff', () => {
    const pool = new LanternfishPool('1');
    pool.makeKids(10);
    const { fishCount } = pool;
    expect(fishCount).toBe(3);
  });
  it('testing stufff', () => {
    const pool = new LanternfishPool('1');
    pool.makeKids(20);
    const { fishCount } = pool;
    // expect(true).toBe(true);
    expect(fishCount).toBe(8);
  });
});

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const pool = new LanternfishPool(test);
    pool.makeKids(18);
    const { fishCount } = pool;

    expect(fishCount).toBe(26);
  });

  it('matches the test code for part 2', () => {
    const pool = new LanternfishPool(test);
    pool.makeKids(80);
    const { fishCount } = pool;

    expect(fishCount).toBe(5934);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const pool = new LanternfishPool(input);
    pool.makeKids(80);
    const { fishCount } = pool;

    expect(fishCount).toBe(393019);
  });

  it('matches the test code for part 2', () => {
    const pool = new LanternfishPool(input);
    pool.makeKids(256);
    const { fishCount } = pool;

    expect(fishCount).toBe(1757714216975);
  });
});
