import { isConstructorDeclaration } from 'typescript';
import { HeightMqp } from './Cave/HeightMap';
import { CastOfCrabs } from './Crab/CastOfCrabs';
import { Crab } from './Crab/Crab';
import { VentDiagram } from './HydrothermalVents/VentDiagram';
import { SegmentDisplay } from './SevenSegmentDisplays/SegmentDisplay';

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

    const ventDiagram = new VentDiagram(linesToUse);
    return ventDiagram.numberOfOverlaps;
  }

  determineCheapestHorizontalPosition({
    input,
    fuelCostMethod = 'consistent',
  }) {
    const crabs = new CastOfCrabs(input);

    const fuelCostsToGetToCrab =
      crabs.findAllFuelCosts(fuelCostMethod);

    let lowestCost = 0;
    let location = 0;

    fuelCostsToGetToCrab.map((distance, i) => {
      if (lowestCost == 0) {
        lowestCost = distance;
        location = i;
      } else if (lowestCost > distance) {
        lowestCost = distance;
        location = i;
      }
    });

    return lowestCost;
  }

  analyzeDisplayCode({ input }) {
    const displays = input
      .split('\n')
      .map((code) => new SegmentDisplay(code));

    const total = displays
      .map((display) => display.uniqueNumberCount)
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    const codes = displays.map((display) => display.code);

    const codeSum = codes.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    return [total, codeSum];
  }
}
