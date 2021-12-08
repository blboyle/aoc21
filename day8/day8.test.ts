import { input, test } from './fixtures';
import { Player } from '../src';

const player = new Player();

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const [total] = player.analyzeDisplayCode({
      input: test,
    });
    expect(total).toBe(26);
  });

  it('matches the test code for part 2', () => {
    const [_, codeSum] = player.analyzeDisplayCode({
      input: test,
    });
    expect(codeSum).toBe(61229);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const [total] = player.analyzeDisplayCode({
      input,
    });
    expect(total).toBe(470);
  });

  it('matches the input code for part 2', () => {
    const [_, codeSum] = player.analyzeDisplayCode({
      input,
    });
    expect(codeSum).toBe(989396);
  });
});
