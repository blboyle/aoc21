import { Line } from './HydrothermalVents/Line';
import { VentDiagram } from './HydrothermalVents/VentDiagram';

export class Player {
  constructor() {}
  countSonarIncrease(sonarReport: number[]) {
    const countIncreases = (array): number => {
      let count = 0;
      array.map((item, i, arr) => {
        if (item > arr[i - 1]) {
          count++;
        }
      });

      return count;
    };

    const inOrder = () => countIncreases(sonarReport);

    const byThree = () => {
      const slidingSonarReport: number[] =
        sonarReport.flatMap((_, i, arr) => {
          if (i == 0 || i == arr.length - 1) {
            return [];
          }

          return [arr[i - 1] + arr[i] + arr[i + 1]];
        });
      return countIncreases(slidingSonarReport);
    };

    return {
      inOrder,
      byThree,
    };
  }

  private hydrothermalVentDiagram;

  reviewHydrothermalVentLineList({
    lineList,
    includeDiagonals = false,
  }) {
    const linesToUse = lineList.filter(
      (line) =>
        line.isHorizontal ||
        line.isVertical ||
        (includeDiagonals && line.isDiagonal),
    );

    this.hydrothermalVentDiagram = new VentDiagram(
      linesToUse,
    );
  }

  get numberOfOverlaps() {
    return this.hydrothermalVentDiagram.findOverlaps();
  }
}
