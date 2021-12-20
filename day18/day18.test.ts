import {
  input,
  singleExplode1,
  singleExplode2,
  singleExplode3,
  singleExplode4,
  singleExplode5,
  singleExplodeExpected1,
  singleExplodeExpected2,
  singleExplodeExpected3,
  singleExplodeExpected4,
  singleExplodeExpected5,
  test1,
} from './fixtures';

import { SnailfishPod } from '../src/Snailfish/SnailfishPod';

describe.skip('testing', () => {
  describe('single explode', () => {
    it.each([
      [singleExplode1, singleExplodeExpected1],
      [singleExplode2, singleExplodeExpected2],
      // [singleExplode3, singleExplodeExpected3],
      [singleExplode4, singleExplodeExpected4],
      // [singleExplode5, singleExplodeExpected5],
    ])('initial testing %s', (input, expected) => {
      const pod = new SnailfishPod({ input });
      const { singleExplode } = pod;
      expect(singleExplode).toBe(expected);
    });
  });

  describe('part one ', () => {
    it.skip.each([
      [test1],
      // [input]
    ])('initial testing', (input) => {
      const pod = new SnailfishPod({ input });
      expect(true).toBe(true);
    });
  });
});
