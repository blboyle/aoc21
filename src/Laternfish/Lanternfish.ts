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
    let hashKey = lifeTime;

    // console.log(
    //   {
    //     id: this.id,
    //     parent,
    //     daysLeft: this.daysLeft,
    //     lifeTime,
    //   },
    //   // 'may make kids',
    // );

    // if (lifeTime < this.daysLeft) {
    //   // console.log('returning');
    //   return 1;
    // }

    while (lifeTime > this.daysLeft) {
      // console.log('in loop', {
      //   id: this.id,
      //   daysLeft: this.daysLeft,
      //   lifeTime,
      // });
      // console.log({
      //   id: this.id,
      //   totalDaysLeft,
      //   fishdaysleft: this.daysLeft,
      // });

      lifeTime -= this.daysLeft;
      this.daysLeft = 7;
      // const birthdayDaysRemain = lifeTime - 1;
      // i--;

      const newFish = new Lanternfish({});
      count += newFish.countTotalOffspring(
        this.id,
        lifeTime,
      );
      // count++;
      // console.log({ lifeTime, count });

      // LanternfishPool.count += total;

      // console.log(
      //   { id: this.id },
      //   `adding ${lifeCounter}:${total} to hash`,
      // );

      // Lanternfish[lifeCounter] = total;
    }
    // Lanternfish.birthdayHash[lifeTime] = count;
    // console.log({
    //   id: this.id,
    //   h: Lanternfish.birthdayHash,
    // });
    // return Lanternfish.birthdayHash[lifeTime];
    return 1 + count;
  }

  accessHash(id, totalDaysLeft) {
    console.log(
      { id },
      `accessing hash value for ${totalDaysLeft} ->`,
      Lanternfish[totalDaysLeft],
    );
    return Lanternfish[totalDaysLeft];
  }
}
