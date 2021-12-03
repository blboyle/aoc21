type NavigateMethod = 'depth' | 'withAim';
type DirectionType = 'forward' | 'down' | 'up';
type DirectionAmount = number;
type Direction = [DirectionType, DirectionAmount];

export class Submarine {
  constructor() {
    this.depth = 0;
    this.horizontalPosition = 0;
    this.aim = 0;
  }

  private diagnosticReport;

  private horizontalPosition: number;
  private depth: number;
  private aim: number;

  private gammaRate;
  private epsilonRate;
  private oxygenGeneratorRating;
  private co2ScrubberRating;

  // day 1

  sonarSweep(input: string) {
    const regexString = /(\d+)\w/;
    return input
      .split('\n')
      .map((line) => line.trim().match(regexString))
      .filter((row) => row != null)
      .map(([amount]) => Number(amount));
  }

  // day 2

  navigate({
    input,
    method = 'withAim',
  }: {
    input: string;
    method: NavigateMethod;
  }) {
    const directions: Direction[] = this.prepareDirections(input);

    directions.map(([directionType, amount]) => {
      switch (directionType) {
        case 'forward':
          this.moveForward(amount);
          if (method === 'withAim') {
            const depthChange = this.aim * amount;
            this.increaseDepth(depthChange);
          }
          break;
        case 'down':
          if (method === 'withAim') {
            this.increaseAim(amount);
          } else if (method == 'depth') {
            this.increaseDepth(amount);
          }
          break;
        case 'up':
          if (method === 'withAim') {
            this.decreaseAim(amount);
          } else if (method == 'depth') {
            this.decreaseDepth(amount);
          }
          break;
        default:
      }
    });
  }

  get position() {
    return {
      depth: this.depth,
      horizontalPosition: this.horizontalPosition,
    };
  }

  // day 3

  createDiagnosticReport(input) {
    this.diagnosticReport = input.split('\n');
  }

  generateOxygenGeneratorRating() {
    let currentListOfValues = this.diagnosticReport;
    const [{ length }] = this.diagnosticReport;

    for (let i = 0; i < length && currentListOfValues.length > 1; i++) {
      const commonBit = this.countCommonBit({
        report: currentListOfValues,
        index: i,
      });

      currentListOfValues = currentListOfValues.filter(
        (row) => row[i] == commonBit,
      );
    }
    const [oxygenGeneratorRatingBinary] = currentListOfValues;
    const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingBinary, 2);
    this.oxygenGeneratorRating = oxygenGeneratorRating;
    return this.oxygenGeneratorRating;
  }

  generateCo2ScrubberRating() {
    let currentListOfValues = this.diagnosticReport;
    const { length } = this.diagnosticReport[0];

    for (let i = 0; i < length && currentListOfValues.length > 1; i++) {
      const commonBit = this.countCommonBit({
        report: currentListOfValues,
        index: i,
      });

      currentListOfValues = currentListOfValues.filter(
        (row) => row[i] != commonBit,
      );
    }
    const [co2ScrubberRatingBinary] = currentListOfValues;
    const co2ScrubberRating = parseInt(co2ScrubberRatingBinary, 2);
    this.co2ScrubberRating = co2ScrubberRating;

    return this.co2ScrubberRating;
  }

  generateGammaRate() {
    const commonBitArray = this.countCommonBits(this.diagnosticReport);
    const gammaRateBinary = commonBitArray.join('');
    this.gammaRate = parseInt(gammaRateBinary, 2);
    return this.gammaRate;
  }

  generateEpsilonRate() {
    const commonBitArray = this.countCommonBits(this.diagnosticReport);
    const epsilonArray = commonBitArray.map((item) => {
      if (item == 0) return 1;
      if (item == 1) return 0;
    });
    const epsilonRateBinary = epsilonArray.join('');
    this.epsilonRate = parseInt(epsilonRateBinary, 2);
    return this.epsilonRate;
  }

  get powerConsumption() {
    if (this.diagnosticReport == null || this.diagnosticReport?.length < 1) {
      throw new Error('Create diagnostic report.');
    }
    this.generateGammaRate();
    this.generateEpsilonRate();
    return this.gammaRate * this.epsilonRate;
  }

  get lifeSupportRating() {
    if (this.diagnosticReport == null || this.diagnosticReport?.length < 1) {
      throw new Error('Create diagnostic report.');
    }
    this.generateOxygenGeneratorRating();
    this.generateCo2ScrubberRating();
    return this.co2ScrubberRating * this.oxygenGeneratorRating;
  }

  // ** internal methods

  countCommonBits(report) {
    const [{ length }] = report;
    const gammaRateArray = [];

    for (let i = 0; i < length; i++) {
      const commonBit = this.countCommonBit({
        report,
        index: i,
      });

      gammaRateArray.push(commonBit);
    }

    return gammaRateArray;
  }

  countCommonBit({ report, index }) {
    const winner = report.reduce((acc, current) => {
      if (Number(current[index]) === 0) {
        return acc - 1;
      }
      if (Number(current[index]) === 1) {
        return acc + 1;
      }
    }, 0);

    if (winner < 0) {
      return 0;
    } else {
      return 1;
    }
  }

  prepareDirections(input: string) {
    return input
      .split('\n')
      .map((line) => line.trim().split(' '))
      .map(
        ([directionType, amount]) =>
          [directionType, Number(amount)] as Direction,
      );
  }

  moveForward(amount: number) {
    this.horizontalPosition += amount;
  }

  increaseDepth(amount: number) {
    this.depth += amount;
  }

  decreaseDepth(amount: number) {
    this.depth -= amount;
  }

  increaseAim(amount: number) {
    this.aim += amount;
  }

  decreaseAim(amount: number) {
    this.aim -= amount;
  }
}
