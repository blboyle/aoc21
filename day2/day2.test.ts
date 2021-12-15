import { input, test } from './fixtures';
import { Submarine } from '../src/';

const getAnswer = (sub) => {
  const {
    position: { depth, horizontalPosition },
  } = sub;
  return depth * horizontalPosition;
};

it.each([
  [test, 'depth', 150],
  [input, 'depth', 1893605],
  [test, 'withAim', 900],
  [input, 'withAim', 2120734350],
])('this one', (input, method, expected) => {
  let sub = new Submarine();
  sub.navigate({ input, method });
  const answer = getAnswer(sub);
  expect(answer).toBe(expected);
});
