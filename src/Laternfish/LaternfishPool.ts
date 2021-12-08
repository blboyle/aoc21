import { Lanternfish } from './Lanternfish';

export class LanternfishPool {
  constructor(input) {
    input
      .split(',')
      .map((daysLeft) => Number(daysLeft))
      .map((daysLeft) => {
        this.pool.push(new Lanternfish({ daysLeft }));
      });
    // console.log({ pool: this.pool });
  }

  pool = [];
  hashTable = [];

  goForwardOneDay() {
    this.pool.map((fish) => {
      const makeNewFish = fish.ageByOneDay();
      if (makeNewFish) {
        this.pool.push(new Lanternfish({ daysLeft: 8 }));
      }
    });
  }

  ageEntirePool(dayCount) {
    // console.log({ dayCount });
    // const kids = this.pool.map((fish) =>
    //   fish.findNumberOfChildren(dayCount),
    // );
    // for (let i = 1; i < 20; i++) {
    //   this.listAges();
    //   // console.log('day count', i);
    //   for (let count = 0; count < i; count++) {
    //     this.goForwardOneDay();
    //   }
    //   this.hashTable.push([i, this.pool.length]);
    //   // this.listAges();
    // }
    // console.log(this.hashTable);
    // const end = this.pool.map((fish) =>
    //   fish.findEndDaysLeft(dayCount),
    // );
    // const totalKids = kids.reduce((acc, curr) => {
    //   return acc + curr;
    // }, 0);
    // console.log({ kids, totalKids });
  }

  makeKids(lifeTime) {
    const total = this.pool.map((fish) => {
      console.log(Lanternfish.birthdayHash);
      console.log('grandpa');
      const totalLifeInDays =
        lifeTime + (8 - fish.daysLeft);
      return fish.countTotalOffspring(
        'none',
        totalLifeInDays,
      );
    });

    console.log({ total });
    // console.log(Lanternfish.birthdayHash);
  }

  listAges() {
    const ages = this.pool
      .map((fish) => fish.daysLeft)
      .join(',');
    // console.log({ ages });
    console.log(this.pool.length);
  }

  get fishCount() {
    return this.pool.length;
  }
}
