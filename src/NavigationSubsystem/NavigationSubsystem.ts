import { Line } from './Line';

export class NavigationSubsystem {
  constructor() {}

  analyseNavSubsystem(input) {
    const lines = input
      .split('\n')
      .map((line) => new Line(line.trim()))
      .map((line, i) => {
        return line.analyse();
      });

    const corrupted = lines
      .filter(([corruptedValue]) => corruptedValue != null)
      .map(([points]) => points)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    const incomplete = lines
      .filter(
        ([_, incompleteValue]) => incompleteValue != null,
      )
      .map(([_, points]) => points)
      .sort((a, b) => {
        if (a == b) return 0;
        return a < b ? -1 : 1;
      });

    const index = Math.floor(incomplete.length / 2);

    return [incomplete[index], corrupted];
  }
}
