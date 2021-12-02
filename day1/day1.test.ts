import { input, test } from './fixtures';
import { Submarine, Player } from '../src/';

const submarine = new Submarine();
const player = new Player();

const examineReport = ({
  input,
  method = 'inOrder',
}: {
  input: string;
  method: 'inOrder' | 'byThree';
}) => {
  const sonarReport = submarine.sonarSweep(input);
  return player.countSonarIncrease(sonarReport)[method]();
};

it('matches the test code for part 1', () => {
  const answer = examineReport({ input: test, method: 'inOrder' });
  expect(answer).toBe(7);
});

it('matches the input code for part 1', () => {
  const answer = examineReport({ input, method: 'inOrder' });
  expect(answer).toBe(1301);
});

it('matches the test code for part 2', () => {
  const answer = examineReport({ input: test, method: 'byThree' });

  expect(answer).toBe(5);
});

it('matches the input code for part 2', () => {
  const answer = examineReport({ input, method: 'byThree' });
  expect(answer).toBe(1346);
});
