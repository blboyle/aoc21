import { ProbeLauncher } from './ProbeLauncher';

export class Probe {
  constructor({ initialVelocity, launcher }) {
    this.initialVelocity = [...initialVelocity];
    this.velocity = [...initialVelocity];
    this.launcher = launcher;
    this.position = [0, 0];

    this.launch();
  }

  initialVelocity;
  velocity;
  position;
  launcher;
  hasHitTarget = false;

  launch() {
    let xVelocity = this.initialVelocity[0];
    let yVelocity = this.initialVelocity[1];

    let highestValue = 0;

    while (
      !this.hasHitTarget &&
      this.position[0] < this.launcher.targetArea.x.max &&
      !this.yHasPassTarget()
    ) {
      this.position[0] += this.velocity[0];
      this.position[1] += this.velocity[1];
      highestValue =
        this.position[1] > highestValue
          ? this.position[1]
          : highestValue;

      if (this.velocity[0] > 0) {
        this.velocity[0]--;
      }
      if (this.velocity[0] < 0) {
        this.velocity[0]++;
      }
      this.velocity[1]--;
      this.hasHitTarget = this.checkIfReachedTarget();
    }

    this.launcher.probeHeights.push([
      this.initialVelocity.toString(),
      highestValue,
      this.hasHitTarget ? 'hit' : 'missed',
      this.position.toString(),
    ]);
  }

  checkIfReachedTarget() {
    if (
      this.position[0] >= this.launcher.targetArea.x.min &&
      this.position[0] <= this.launcher.targetArea.x.max &&
      this.position[1] >= this.launcher.targetArea.y.min &&
      this.position[1] <= this.launcher.targetArea.y.max
    ) {
      return true;
    }

    return false;
  }

  yHasPassTarget() {
    if (this.launcher.targetArea.y.max < 0) {
      if (
        this.position[1] < this.launcher.targetArea.y.min
      ) {
        return true;
      }
    }
    return false;
  }
}
