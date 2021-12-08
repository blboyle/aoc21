import { Lanternfish } from './Lanternfish';

export class LanternfishPool {
  constructor(input) {
    Lanternfish.nextId = 1;
    input
      .split(',')
      .map((daysLeft) => Number(daysLeft))
      .map((daysLeft) => {
        this.pool.push(new Lanternfish({ daysLeft }));
      });
    // console.log({ pool: this.pool });
  }

  static count;

  pool = [];
  hashTable = [];

  totalOffspring = 0;

  makeKids(lifeTime) {
    const total = this.pool
      .map((fish) => {
        const totalLifeInDays =
          lifeTime + (9 - fish.daysLeft);
        return fish.countTotalOffspring(
          'none',
          totalLifeInDays,
        );
      })
      .reduce((acc, curr) => {
        return acc + curr;
      });

    console.log({ total });
    this.totalOffspring = total;
    // console.log(Lanternfish.nextId - 1);
  }

  get fishCount() {
    return this.totalOffspring;
  }
}
