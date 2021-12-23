import {
  input,
  miniTest,
  singleExplode1,
  singleExplode2,
  singleExplode3,
  singleExplode4,
  singleExplode5,
  miniTestStep1,
  miniTestStep2,
  miniTestStep3,
  miniTestStep4,
  miniTestStep5,
  miniTestStep6,
  singleExplodeExpected1,
  singleExplodeExpected2,
  singleExplodeExpected3,
  singleExplodeExpected4,
  singleExplodeExpected5,
  test1,
} from './fixtures';

import { SnailfishPod } from '../src/Snailfish/SnailfishPod';

describe('testing', () => {
  describe('steps', () => {
    it.each([
      [miniTest, miniTestStep1, 1],
      [miniTest, miniTestStep3, 2],
      [miniTest, miniTestStep5, 3],
      [miniTest, miniTestStep6, 6],
    ])('initial testing step', (input, expected, step) => {
      const pod = new SnailfishPod({ input });
      const result = pod.result(step);
      expect(result).toBe(expected);
    });
  });

  describe('single explode', () => {
    it.skip.each([
      [singleExplode1, singleExplodeExpected1],
      [singleExplode2, singleExplodeExpected2],
      [singleExplode3, singleExplodeExpected3],
      [singleExplode4, singleExplodeExpected5],
      [singleExplode5, singleExplodeExpected5],
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
