import { Probe } from './Probe';

export class ProbeLauncher {
  constructor({ input, initialVelocity = null }) {
    this.initialVelocity =
      initialVelocity != null
        ? initialVelocity
            .split(',')
            .map((item) => Number(item))
        : null;
    this.setTargetArea({ input });
    this.makeProbes();
  }

  initialVelocity = null;
  static maxYAttempt = 1000;
  probeHeights = [];

  probes = [];

  get doesItHit() {
    return this.totalHits[0] !== undefined;
  }

  makeProbes() {
    const { x: maxX, y: maxY } = this.maxInitialVelocity;

    for (let x = 0; x <= maxX; x++) {
      for (
        let y = this.targetArea.y.min;
        y <= ProbeLauncher.maxYAttempt;
        y++
      ) {
        if (this.initialVelocity != null) {
          if (
            x == this.initialVelocity[0] &&
            y == this.initialVelocity[1]
          ) {
            this.probes.push(
              new Probe({
                initialVelocity: [x, y],
                launcher: this,
              }),
            );
          }
        } else {
          this.probes.push(
            new Probe({
              initialVelocity: [x, y],
              launcher: this,
            }),
          );
        }
      }
    }
  }

  get totalHitCount() {
    return this.totalHits.length;
  }

  get totalHits() {
    const hits = this.probeHeights
      .filter((item) => item[2] != 'missed')
      .map(([pair]) =>
        pair
          .split(',')
          .map((item) => Number(item))
          .sort((a, b) => {
            if (a[0] == b[0]) {
              if (a[1] == b[1]) {
                return 0;
              }
              return a[1] > b[1] ? 1 : -1;
            }
            return a[0] > b[0] ? 1 : -1;
          }),
      );
    return hits;
  }

  get highestHitPoint() {
    const hits = this.probeHeights
      .filter((item) => item[2] != 'missed')
      .sort((a, b) => {
        if (a[1] == b[1]) return 0;
        return a[1] > b[1] ? -1 : 1;
      });
    const [topHit] = hits;
    return topHit[1];
  }

  setTargetArea({ input }) {
    let [_, coordinates] = input.split('target area: ');

    coordinates.split(', ').map((item) => {
      const [axis, numbers] = item.split('=');
      const [minNum, maxNum] = numbers.split('..');

      this.targetArea[axis] = {
        min: Number(minNum),
        max: Number(maxNum),
      };

      this.maxInitialVelocity[axis] =
        axis == 'x'
          ? Math.abs(Number(maxNum))
          : Number(maxNum);
    });
  }

  targetArea = {
    x: { min: 0, max: 0 },
    y: { min: 0, max: 0 },
  };
  maxInitialVelocity = { x: 0, y: 0 };
}
