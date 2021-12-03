import { input, test } from './fixtures';
import { Submarine } from '../src/';

let sub;

beforeEach(() => {
  sub = new Submarine();
});

const getAnswer = (sub) => {
  const {
    position: { depth, horizontalPosition },
  } = sub;
  return depth * horizontalPosition;
};

it('matches the test code for part 1', () => {
  sub.navigate({ input: test, method: 'depth' });
  const answer = getAnswer(sub);
  expect(answer).toBe(150);
});

it('matches the input code for part 1', () => {
  sub.navigate({ input, method: 'depth' });
  const answer = getAnswer(sub);
  expect(answer).toBe(1893605);
});

it('matches the test code for part 2', () => {
  sub.navigate({ input: test });
  const answer = getAnswer(sub);
  expect(answer).toBe(900);
});

it('matches the input code for part 2', () => {
  sub.navigate({ input });
  const answer = getAnswer(sub);
  expect(answer).toBe(2120734350);
});
