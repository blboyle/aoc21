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

  ageByOneDay() {
    let makeNewFish = false;
    if (this.daysLeft > 0) {
      this.daysLeft--;
    } else if (this.daysLeft == 0) {
      this.daysLeft = 6;
      makeNewFish = true;
    }
    return makeNewFish;
  }

  countTotalOffspring(parent, lifeTime) {
    if (parent == 'none') {
      this.daysLeft = 9;
    }

    let kids;

    console.log(
      {
        id: this.id,
        parent,
        daysLeft: this.daysLeft,
        lifeTime,
      },
      // 'may make kids',
    );

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

      kids = newFish.countTotalOffspring(this.id, lifeTime);

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
    return `LifeTime: ${lifeTime}, ${kids ? kids : 'end'}`;
  }

  accessHash(id, totalDaysLeft) {
    console.log(
      { id },
      `accessing hash value for ${totalDaysLeft} ->`,
      Lanternfish[totalDaysLeft],
    );
    return Lanternfish[totalDaysLeft];
  }

  decreaseDaysLeft() {
    this.daysLeft--;
    if (this.daysLeft < 0) {
      this.daysLeft = 6;
    }
  }

  findNumberOfChildren(timePeriod) {
    // const n = timePeriod - this.daysLeft;

    // if (n > 0) {
    //   console.log({ n });
    // }

    return 1;
  }

  findEndDaysLeft(days) {
    const difference = days % 7;

    const newDaysLeft = this.daysLeft - difference;

    if (newDaysLeft < 0) {
      return 7 - Math.abs(newDaysLeft);
    }

    return newDaysLeft;
  }
}
