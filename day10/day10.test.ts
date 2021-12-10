import { input, test } from './fixtures';
import { Player } from '../src';
import { NavigationSubsystem } from '../src/NavigationSubsystem/NavigationSubsystem';

const player = new Player();
const nav = new NavigationSubsystem();

expect(true).toBe(true);

describe('test input', () => {
  it('matches the test code for part 1', () => {
    const [_, corrupted] = nav.analyseNavSubsystem(test);
    expect(corrupted).toBe(26397);
  });

  it('matches the test code for part 2', () => {
    const [incomplete] = nav.analyseNavSubsystem(test);
    expect(incomplete).toBe(288957);
  });
});

describe('input', () => {
  it('matches the test code for part 1', () => {
    const [_, corrupted] = nav.analyseNavSubsystem(input);
    expect(corrupted).toBe(311949);
  });

  it('matches the input code for part 2', () => {
    const [incomplete] = nav.analyseNavSubsystem(input);
    expect(incomplete).toBe(3042730309);
  });
});
