export class Lanternfish {
  constructor({ daysLeft = 8, countChildren = false }) {
    this.daysLeft = daysLeft;
    this.id = Lanternfish.nextId;
    Lanternfish.nextId++;
  }

  static spawnRateInDays: number = 6;
  static birthdayHash = {};
  static nextId = 0;

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
      this.daysLeft = 8;
    }

    let lifeCounter = lifeTime;

    console.log(
      {
        id: this.id,
        parent,
        daysLeft: this.daysLeft,
        lifeTime,
      },
      'may make kids',
    );
    let count = 0;
    this.daysLeft = 0;

    let i = 30;

    // console.log(totalDaysLeft);

    while (lifeCounter >= this.daysLeft && i > 0) {
      // console.log({
      //   id: this.id,
      //   totalDaysLeft,
      //   fishdaysleft: this.daysLeft,
      // });

      lifeCounter -= this.daysLeft;
      this.daysLeft = 6;
      i--;
      count++;

      // const total = new Lanternfish({}).countTotalOffspring(
      //   this.id,
      //   lifeCounter,
      // );

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
