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

  makeKids(parent, lifeTime) {
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

    let totalDaysLeft = lifeTime - this.daysLeft;
    this.daysLeft = 0;

    // console.log(totalDaysLeft);

    while (totalDaysLeft >= this.daysLeft) {
      // console.log({
      //   id: this.id,
      //   totalDaysLeft,
      //   fishdaysleft: this.daysLeft,
      // });

      totalDaysLeft -= this.daysLeft;
      this.daysLeft = 6;
      // i--;
      count++;

      const total =
        Lanternfish[totalDaysLeft] != undefined
          ? this.accessHash(this.id, totalDaysLeft)
          : new Lanternfish({}).makeKids(
              this.id,
              totalDaysLeft,
            );

      console.log(
        { id: this.id },
        `adding ${totalDaysLeft}:${total} to hash`,
      );

      Lanternfish[totalDaysLeft] = total;
    }
    Lanternfish.birthdayHash[lifeTime] = count;
    // console.log({
    //   id: this.id,
    //   h: Lanternfish.birthdayHash,
    // });
    return Lanternfish.birthdayHash[lifeTime];
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
