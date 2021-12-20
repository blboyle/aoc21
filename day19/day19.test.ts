import { miniTest, test, input } from './fixtures';

import { ImageEnhancement } from '../src/ImageEnhanement/ImageEnhancement';

describe('testing', () => {
  describe('part one', () => {
    it.each([
      [2, 35, test, true],
      [2, 5097, input, true],
    ])(
      '%i enchancements gives %i lit lights',
      (count, expected, input, trim) => {
        const image = new ImageEnhancement({ input });
        const { litPixels } = image.enhance({
          count,
          trim,
        });
        expect(litPixels).toBe(expected);
      },
    );
  });

  describe('part two ', () => {
    it.each([
      [50, 3351, test, true],
      [50, 17987, input, true],
    ])(
      '%i enchancements gives %i lit lights',
      (count, expected, input, trim) => {
        const image = new ImageEnhancement({ input });
        const { litPixels } = image.enhance({
          count,
          trim,
        });
        expect(litPixels).toBe(expected);
      },
    );
  });
});

/*

.........
.........
..#..#...
..#......
..##..#..
....#....
....###..
.........
.........


*/
