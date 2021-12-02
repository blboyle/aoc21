import { input, test } from './fixtures';
import { Submarine, Player } from '../src/';

let answer = 0;

it('matches the test code for part 1', () => {
  const sub = new Submarine();

  sub.navigate(test);
  const position = sub.getPosition();
  const answer = position.depth * position.horizontalPosition;
  expect(answer).toBe(150);
});

it('matches the input code for part 1', () => {
  const sub = new Submarine();

  sub.navigate(input);
  const position = sub.getPosition();
  const answer = position.depth * position.horizontalPosition;
  expect(answer).toBe(1301);
});

it.skip('matches the test code for part 2', () => {
  expect(answer).toBe(5);
});

it.skip('matches the input code for part 2', () => {
  expect(answer).toBe(1346);
});
