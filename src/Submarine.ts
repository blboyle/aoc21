/** @format */

export class Submarine {
  constructor() {
    this.depth = 0;
    this.horizontalPosition = 0;
  }

  private horizontalPosition;
  private depth;

  sonarSweep(input) {
    const regexString = /(\d+)\w/;
    return input
      .split('\n')
      .map((line) => line.trim().match(regexString))
      .filter((item) => item != null)
      .map((item) => Number(item[0]));
  }

  moveForward(amount) {
    this.horizontalPosition += amount;
  }

  increaseDepth(amount) {
    this.depth += amount;
  }

  decreaseDepth(amount) {
    this.depth -= amount;
  }

  navigate(input) {
    const directions = input
      .split('\n')
      .map((line) => line.trim())
      .filter((item) => item != null)
      .map((item) => item.split(' '))
      .map((item) => [item[0], Number(item[1])]);

    directions.map((item) => {
      switch (item[0]) {
        case 'forward':
          this.moveForward(item[1]);
          break;
        case 'down':
          this.increaseDepth(item[1]);
          break;
        case 'up':
          this.decreaseDepth(item[1]);
          break;
        default:
      }
    });
  }

  getPosition() {
    return {
      depth: this.depth,
      horizontalPosition: this.horizontalPosition,
    };
  }
}
