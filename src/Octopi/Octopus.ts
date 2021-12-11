import { OctopusPool } from './OctopusPool';

export class Octopus {
  constructor({ location, energyLevel, pool }) {
    this.energyLevel = energyLevel;
    this.id = Octopus.nextId;
    Octopus.nextId++;
    this.pool = pool;
    this.location = location;
  }

  static nextId = 1;
  energyLevel;
  pool;
  id;
  location;

  increaseStep({ duringFlash = false }) {
    if (duringFlash && this.energyLevel > 0) {
      this.energyLevel++;
    }

    if (!duringFlash) {
      this.energyLevel++;
    }
    if (this.energyLevel > 9) {
      OctopusPool.flashes++;
      this.energyLevel = 0;
    }
  }

  flash(pool) {
    if (OctopusPool.currentStep == 3) {
      //   console.log(this.energyLevel);
    }
    if (
      this.energyLevel == 0 &&
      !pool.checkedFlashes.includes(this.id)
    ) {
      pool.octopusFlashes++;
      //   console.log(this.location, 'flashed');
      pool.checkedFlashes.push(this.id);
      this.increaseNeighbours();
      pool.flashPool();
    }
  }

  increaseNeighbours() {
    const [x, y] = this.location;

    const { pool } = this.pool;

    // console.log({ x, y });

    let n =
      pool[y - 1] == undefined ? null : pool[y - 1][x];
    // console.log({ n }, pool[y]);

    let ne =
      pool[y - 1] == undefined ||
      pool[y][x + 1] == undefined
        ? null
        : pool[y - 1][x + 1];
    // console.log({ ne }, pool[y]);

    let e =
      pool[y][x + 1] == undefined ? null : pool[y][x + 1];
    // console.log({ e });

    let se =
      pool[y + 1] == undefined ||
      pool[y][x + 1] == undefined
        ? null
        : pool[y + 1][x + 1];
    let s =
      pool[y + 1] == undefined ? null : pool[y + 1][x];
    let sw =
      pool[y + 1] == undefined ||
      pool[y][x - 1] == undefined
        ? null
        : pool[y + 1][x - 1];
    let w =
      pool[y][x - 1] == undefined ? null : pool[y][x - 1];
    let nw =
      pool[y - 1] == undefined ||
      pool[y][x - 1] == undefined
        ? null
        : pool[y - 1][x - 1];

    const neighbours = [n, ne, e, se, s, sw, w, nw].filter(
      (neighbour) => neighbour != null,
    );

    neighbours.map((neighbours) =>
      neighbours.increaseStep({ duringFlash: true }),
    );

    // console.log({ neighbours });
  }
}
