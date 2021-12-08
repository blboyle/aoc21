import { input, test } from './fixtures';

import { LanternfishPool } from '../src/Laternfish/LaternfishPool';

describe('test input', () => {
  it.only('testing stufff', () => {
    const pool = new LanternfishPool('1');
    pool.makeKids(10);
    const { fishCount } = pool;
    expect(true).toBe(true);
    // expect(fishCount).toBe(5934);
  });

  it.skip('testing stufff', () => {
    const pool = new LanternfishPool('1');
    pool.makeKids(20);
    const { fishCount } = pool;
    expect(true).toBe(true);
    // expect(fishCount).toBe(5934);
  });

  it.skip('matches the test code for part 1', () => {
    const pool = new LanternfishPool(test);
    pool.makeKids(18);
    const { fishCount } = pool;

    expect(fishCount).toBe(26);
  });

  it.skip('matches the test code for part 1', () => {
    const pool = new LanternfishPool(test);
    pool.makeKids(80);
    const { fishCount } = pool;

    expect(fishCount).toBe(5934);
  });

  it.skip('testing stufff', () => {
    const pool = new LanternfishPool('0,1');
    pool.makeKids(256);
    const { fishCount } = pool;
    expect(true).toBe(true);
    // expect(fishCount).toBe(5934);
  });

  it.skip('matches the test code for part 1', () => {
    const pool = new LanternfishPool(test);
    pool.makeKids(18);
    const { fishCount } = pool;

    expect(fishCount).toBe(5934);
  });

  it('matches the test code for part 2', () => {
    const pool = new LanternfishPool(test);
    pool.makeKids(256);
    const { fishCount } = pool;

    expect(fishCount).toBe(26984457539);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const pool = new LanternfishPool(input);
    pool.ageEntirePool(80);
    const { fishCount } = pool;

    expect(fishCount).toBe(393019);
  });

  it.skip('matches the input code for part 2', () => {
    expect(true).toBe(true);
  });
});
