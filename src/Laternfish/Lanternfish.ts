import { LanternfishPool } from './LaternfishPool';

export class Lanternfish {
  constructor({ daysLeft = 9, countChildren = false }) {
    this.daysLeft = daysLeft;
    this.id = Lanternfish.nextId;
    Lanternfish.nextId++;
  }

  static spawnRateInDays: number = 6;
  static birthdayHash = {};
  static nextId = 1;

  daysLeft: number;
  firstCycle: boolean;
  birthday: number;
  children: Lanternfish[] = [];
  id: number;

  countTotalOffspring(parent, lifeTime) {
    if (parent == 'none') {
      this.daysLeft = 9;
    }

    let count = 0;
    let topLifeTime = lifeTime;

    if (Lanternfish.birthdayHash[lifeTime] != undefined) {
      return Lanternfish.birthdayHash[lifeTime];
    }

    while (lifeTime > this.daysLeft) {
      lifeTime -= this.daysLeft;
      this.daysLeft = 7;

      const newFish = new Lanternfish({});
      count += newFish.countTotalOffspring(
        this.id,
        lifeTime,
      );
    }

    Lanternfish.birthdayHash[topLifeTime] = 1 + count;
    return Lanternfish.birthdayHash[topLifeTime];
  }
}
