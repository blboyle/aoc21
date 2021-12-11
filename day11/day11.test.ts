import {
  input,
  miniTest,
  test,
  miniTestStep1,
  miniTestStep2,
  testStep1,
  testStep2,
  testStep3,
  testStep4,
  testStep5,
  testStep6,
  testStep7,
  testStep8,
  testStep9,
  testStep10,
  testStep20,
  testStep30,
  testStep40,
  testStep50,
  testStep60,
  testStep70,
  testStep80,
  testStep90,
  testStep100,
} from './fixtures';
import { Player } from '../src';
import { NavigationSubsystem } from '../src/NavigationSubsystem/NavigationSubsystem';

const player = new Player();

expect(true).toBe(true);

describe('mini test', () => {
  it('matches the mini test code for part 1', () => {
    const { diagram } = player.countNumberOfOctopusFlashes({
      input: miniTest,
      steps: 1,
    });
    expect(diagram).toMatch(miniTestStep1);
  });

  it('matches the mini test code for part 1', () => {
    const { diagram } = player.countNumberOfOctopusFlashes({
      input: miniTest,
      steps: 2,
    });
    expect(diagram).toMatch(miniTestStep2);
  });
});

describe('test input', () => {
  it.each([
    [1, testStep1],
    [2, testStep2],
    [3, testStep3],
    [4, testStep4],
    [5, testStep5],
    [6, testStep6],
    [7, testStep7],
    [8, testStep8],
    [9, testStep9],
    [10, testStep10],
    [20, testStep20],
    [30, testStep30],
    [40, testStep40],
    [50, testStep50],
    [60, testStep60],
    [70, testStep70],
    [80, testStep80],
    [90, testStep90],
    [100, testStep100],
  ])(
    'matches the test code for part 1 - step %i',
    (steps, expectedDiagram) => {
      const { diagram } =
        player.countNumberOfOctopusFlashes({
          input: test,
          steps,
        });

      const diagramExploded = diagram.split('\n');
      const expectedExploded = expectedDiagram.split('\n');

      for (let i = 0; i < diagramExploded.length; i++) {
        expect(diagramExploded[i]).toMatch(
          expectedExploded[i],
        );
      }
    },
  );

  it('matches the test code for part 1', () => {
    const { totalOctopusFlashes } =
      player.countNumberOfOctopusFlashes({
        input: test,
        steps: 100,
      });
    expect(totalOctopusFlashes).toBe(1656);
  });

  it('matches the test code for part 2', () => {
    const { stepOfSynchronisation } =
      player.checkIfPoolIsSynchornized({
        input: test,
      });
    expect(stepOfSynchronisation).toBe(195);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    const { totalOctopusFlashes } =
      player.countNumberOfOctopusFlashes({
        input: input,
        steps: 100,
      });
    expect(totalOctopusFlashes).toBe(1723);
  });

  it('matches the input code for part 2', () => {
    const { stepOfSynchronisation } =
      player.checkIfPoolIsSynchornized({
        input,
      });
    expect(stepOfSynchronisation).toBe(327);
  });
});
