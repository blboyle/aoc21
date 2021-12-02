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

  private horizontalPosition: number;
  private depth: number;
  private aim: number;

  sonarSweep(input: string) {
    const regexString = /(\d+)\w/;
    return input
      .split('\n')
      .map((line) => line.trim().match(regexString))
      .filter((row) => row != null)
      .map(([amount]) => Number(amount));
  }

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
