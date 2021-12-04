import { input, test } from './fixtures';
import { Submarine } from '../src';

const sub = new Submarine();

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const bingo = sub.startBingo(test);
    bingo.playGame({});
    const { score } = bingo;
    expect(score).toBe(4512);
  });

  it('matches the test code for part 2', () => {
    const bingo = sub.startBingo(test);
    bingo.playGame({ letThemWin: true });
    const { score } = bingo;
    expect(score).toBe(1924);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const bingo = sub.startBingo(input);
    bingo.playGame({});
    const { score } = bingo;
    expect(score).toBe(8136);
  });

  it('matches the input code for part 2', () => {
    const bingo = sub.startBingo(input);
    bingo.playGame({ letThemWin: true });
    const { score } = bingo;
    expect(score).toBe(12738);
  });
});
