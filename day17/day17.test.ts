import {
  input,
  test1,
  testPart2Expected,
} from './fixtures';

import { ProbeLauncher } from '../src/ProbeLauncher/ProbeLauncher';

describe('testing', () => {
  describe('part one and two', () => {
    it.each([
      ['example', test1, 112],
      ['input', input, 2118],
    ])('checking for counts - %s', (_, input, expected) => {
      const launcher = new ProbeLauncher({
        input,
      });

      const { totalHitCount } = launcher;

      expect(totalHitCount).toBe(expected);
    });

    it.each([
      ['example', test1, 45],
      ['input', input, 5565],
    ])(
      'checking for highest position - %s',
      (_, input, expected) => {
        const launcher = new ProbeLauncher({
          input,
        });

        const { highestHitPoint } = launcher;

        expect(highestHitPoint).toBe(expected);
      },
    );
  });

  describe('individual checking', () => {
    it.each([
      [test1, '7,2', 'hits'],
      [test1, '6,3', 'hits'],
      [test1, '9,0', 'hits'],
      [test1, '17,-4', 'misses'],
      [test1, '6,9', 'hits'],
      [test1, '6,0', 'hits'], // good
      [test1, '6,1', 'hits'],
      [test1, '7,-1', 'hits'],
      [test1, '20,-10', 'hits'],
      [test1, '6,0', 'hits'],
      [test1, '6,0', 'hits'],
      [test1, '6,0', 'hits'],
      [test1, '6,3', 'hits'],
      [test1, '9,0', 'hits'],
      [test1, '17,-4', 'misses'],
      [test1, '6,9', 'hits'],
    ])(
      '%p %s checking for hits',
      (input, initialVelocity, expected) => {
        const launcher = new ProbeLauncher({
          input,
          initialVelocity,
        });

        const hits = launcher.doesItHit ? 'hits' : 'misses';

        expect(hits).toBe(expected);
      },
    );
  });

  it.each([[testPart2Expected, test1]])(
    'checking for highest velocity - %i',
    (expected, input) => {
      const launcher = new ProbeLauncher({
        input,
      });

      const { totalHits } = launcher;

      expect(totalHits.join('\n')).toBe(
        expected.join('\n'),
      );
    },
  );
});
