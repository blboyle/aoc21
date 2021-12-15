import { isConstructorDeclaration } from 'typescript';
import { HeightMqp } from './Cave/HeightMap';
import { CastOfCrabs } from './Crab/CastOfCrabs';
import { Crab } from './Crab/Crab';
import { VentDiagram } from './HydrothermalVents/VentDiagram';
import { OctopusPool } from './Octopi/OctopusPool';
import { Cave } from './Cave/Cave';
import { SegmentDisplay } from './SevenSegmentDisplays/SegmentDisplay';
import { TransparentPaper } from './TransparentPaper/TransparentPaper';
import { Polymerization } from './Polymerization/Polymerization';
import { ChitonMap } from './ChitonMap/ChitonMap';

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

  countNumberOfOctopusFlashes({ input, steps }) {
    const { diagram, totalOctopusFlashes } =
      new OctopusPool({
        input,
        steps,
      });

    return { diagram, totalOctopusFlashes };
  }

  checkIfPoolIsSynchornized({ input }) {
    const { stepOfSynchronisation } = new OctopusPool({
      input,
      steps: 0,
    });

    return { stepOfSynchronisation };
  }

  readHeightMap({ input }) {
    const heightMap = new HeightMqp({ input });
    const { riskLevel, topThreeBasinProduct } = heightMap;

    return { riskLevel, topThreeBasinProduct };
  }

  findPaths({ input, double = false }) {
    const cave = new Cave({ input });
    Cave.canVisitTwice = double;
    const paths = cave.getNumberOfPaths();
    return paths;
  }

  analyseTransparentPaper({ input }) {
    const { code, analysis } = new TransparentPaper({
      input,
    });
    return { code, analysis };
  }

  readPolymerization({ input, steps }) {
    const sheet = new Polymerization({
      input,
    });

    const { mostCommonChars } = sheet.getNthStep({ steps });

    const difference =
      mostCommonChars[0][1] -
      mostCommonChars[mostCommonChars.length - 1][1];

    return { difference };
  }

  navigateChitons({ input }) {
    const map = new ChitonMap({ input });
  }
}
