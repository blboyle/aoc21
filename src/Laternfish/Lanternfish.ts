export class Lanternfish {
  constructor({ daysLeft = 8 }) {
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

  makeKids(lifeTime) {
    let count = 1;

    if (lifeTime >= this.daysLeft) {
      for (let i = lifeTime; i > 0; i--) {
        if (this.children.length > 0) {
          this.children.map((fish) => {
            if (
              Lanternfish.birthdayHash[lifeTime] !=
              undefined
            ) {
              // console.log('hi');
              return Lanternfish.birthdayHash[lifeTime];
            } else {
              count += fish.makeKids(i);
            }
          });
        }

        if (this.daysLeft == 0 && i > 1) {
          console.log(
            this.id,
            this.daysLeft,
            'is making a baby at',
            i,
          );
          this.children.push(new Lanternfish({}));
        }

        // console.log({ i });
        this.decreaseDaysLeft();
      }
    }
    Lanternfish.birthdayHash[lifeTime] = count;
    return Lanternfish.birthdayHash[lifeTime];
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
