import { Octopus } from './Octopus';

export class OctopusPool {
  constructor({ input, steps }) {
    this.steps = steps;
    this.pool = input.split('\n').map((row, y) =>
      row.split('').map(
        (energyLevel, x) =>
          new Octopus({
            location: [x, y],
            energyLevel,
            pool: this,
          }),
      ),
    );
    this.countSteps();
  }

  octopusFlashes = 0;
  pool;
  steps;
  static currentStep;
  checkedFlashes = [];
  diagram;
  static flashes = 0;
  static logCounts = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70,
    80, 90, 100,
  ];

  countSteps() {
    for (let i = 1; i <= this.steps; i++) {
      OctopusPool.currentStep = i;
      //   this.outputPool(i);
      this.countStep();
      this.outputPool(i);
      this.checkedFlashes = [];
    }
    // console.log(OctopusPool.flashes);
  }

  checkSynchonisation() {
    // console.log('checking sync');
    let isSynchronized = false;
    let count = 0;
    let max = 200000000;
    while (!isSynchronized && max > 0) {
      max--;

      OctopusPool.currentStep = count;
      //   this.outputPool(i);
      this.countStep();
      //   this.outputPool(count);
      this.checkedFlashes = [];
      if (count > 193 && count < 1000000) {
        // console.log({ count });
        this.outputPool(count);
        isSynchronized = this.isPoolSyncronized();
        if (isSynchronized) {
          //   console.log({ count });
        }
      }
      count++;
    }
    return count;
  }

  get stepOfSynchronisation() {
    return this.checkSynchonisation();
  }

  isPoolSyncronized() {
    return this.pool.every((row) =>
      row.every((octopus) => octopus.energyLevel === 0),
    );
  }

  countStep() {
    this.increaseStep();
    this.flashPool();
  }

  increaseStep() {
    this.pool.map((row) => {
      row.map((octopus) => {
        octopus.increaseStep({});
      });
    });
  }

  flashPool() {
    this.pool.map((row) => {
      row.map((octopus) => {
        octopus.flash(this);
      });
    });
  }

  get totalOctopusFlashes() {
    return this.octopusFlashes;
  }

  outputPool(i) {
    const diagram = this.pool
      .map((row) =>
        row.map((item) => item.energyLevel).join(''),
      )
      .join('\n');

    this.diagram = diagram;

    // console.log({ i });
    // console.log(diagram);
  }
}
