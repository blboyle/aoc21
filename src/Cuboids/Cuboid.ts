export class Cuboid {
  constructor({ input }) {
    this.steps = this.createSteps({ input });
    this.run();
  }

  steps;

  cuboids = {};
  cuboidsOn;

  findNumberOn() {
    return Object.entries(this.cuboids).reduce(
      (acc, curr) => {
        if (curr[1] == 'on') {
          return acc + 1;
        }
        return acc;
      },
      0,
    );
  }

  get answer() {
    return this.cuboidsOn;
  }

  run() {
    this.steps.map((step, i) => {
      this.scan(step);
    });
    this.cuboidsOn = this.findNumberOn();
  }

  scan(step) {
    let range = { x: 0, y: 0, z: 0 };

    step.axes.map((axis) => {
      range[axis.axis] = axis.range
        .split('..')
        .map((num) => Number(num));
    });

    console.log({ range });

    // if (range.x[0] < -50 || range.x[1] > 50) {
    //   return;
    // }

    for (let x = range.x[0]; x <= range.x[1]; x++) {
      for (let y = range.y[0]; y <= range.y[1]; y++) {
        for (let z = range.z[0]; z <= range.z[1]; z++) {
          let key = `${x}-${y}-${z}`;
          this.cuboids[key] = step.direction;
        }
      }
    }
  }

  createSteps({ input }) {
    return input.split('\n').map((row) => {
      const [direction, axesRaw] = row.split(' ');
      const axes = axesRaw.split(',').map((axis) => {
        const [letter, range] = axis.split('=');
        return {
          axis: letter,
          range,
        };
      });
      return {
        direction,
        axes,
      };
    });
  }
}
