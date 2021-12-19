import { Snailfish } from './Snailfish';

export class Pair {
  constructor({ pair, parent }) {
    this.parent = parent;
    const [first, second] = pair;
    this.first =
      typeof first == 'number'
        ? first
        : first instanceof Pair
        ? first
        : new Pair({ pair: first, parent: this });

    this.second =
      typeof second == 'number'
        ? second
        : second instanceof Pair
        ? second
        : new Pair({ pair: second, parent: this });
  }

  first;
  second;
  parent;

  get toString() {
    const a =
      typeof this.first == 'number'
        ? this.first
        : this.first.toString;
    const b =
      typeof this.second == 'number'
        ? this.second
        : this.second.toString;
    return [a, b];
  }

  reducePair() {
    console.log(this);

    let count = 5;
    let needsReduction = true;
    while (needsReduction && count) {
      needsReduction = this.reduce();
      count--;
      console.log({ count, needsReduction });
    }
    return this;
  }

  reduce() {
    console.log('reduce');
    const peformedExplosion = this.explode();
    const performedSplit = this.split();
    return !peformedExplosion && !performedSplit;
  }

  explode() {
    console.log('explode');
    let depth = 0;
    this.checkDepth({ depth });
    // console.log({ new: this.first.first });

    return true;
  }

  checkDepth({ depth }) {
    depth++;
    // console.log('checkDepth', depth, this);

    if (depth == 4) {
      console.log(depth, 'explode something');
      if (this.first instanceof Pair) {
        console.log('explode first', this.first);
        // const prev = this.first.findPrevRealNumber();
        const next = this.first.findNextRealNumber();
        this.first = 0;
      } else if (this.second instanceof Pair) {
        console.log('explode second', this.second);
        const prev = this.second.findPrevRealNumber();
        const next = this.second.findNextRealNumber();
        this.second = 0;
      }
      return true;
    }
    if (this.first instanceof Pair) {
      return this.first.checkDepth({ depth });
    }

    if (this.second instanceof Pair) {
      return this.second.checkDepth({ depth });
    }
    return false;
  }
  findPrevRealNumber() {
    // console.log('prev');
    let prevRealNumber = null;

    if (
      typeof this.parent.second != 'number' &&
      this == this.parent.second
    ) {
      if (typeof this.parent.first == 'number') {
        this.parent.first = this.first + this.parent.first;
      }
    }
    return prevRealNumber;
  }
  findNextRealNumber() {
    if (
      typeof this.parent.first != 'number' &&
      this == this.parent.first
    ) {
      if (typeof this.parent.second == 'number') {
        this.parent.second =
          this.second + this.parent.second;
      }
    }

    if (
      typeof this.parent.second != 'number' &&
      this == this.parent.second
    ) {
      console.log('second');
      if (
        typeof this.parent.parent.first != 'number' &&
        this.parent.parent.first == this.parent
      ) {
        console.log('-first');
      }

      if (
        typeof this.parent.parent.second != 'number' &&
        this.parent.parent.second == this.parent
      ) {
        console.log('-second');
        if (
          typeof this.parent.parent.parent.first !=
            'number' &&
          this.parent.parent.parent.first ==
            this.parent.parent
        ) {
          console.log('--first');
          if (
            typeof this.parent.parent.parent.parent.first !=
              'number' &&
            this.parent.parent.parent.parent.first ==
              this.parent.parent.parent
          ) {
            console.log('---first');
          }

          if (
            typeof this.parent.parent.parent.parent
              .second != 'number' &&
            this.parent.parent.parent.parent.second ==
              this.parent.parent.parent
          ) {
            console.log('---second');
          }
        }

        if (
          typeof this.parent.parent.parent.second !=
            'number' &&
          this.parent.parent.parent.second ==
            this.parent.parent
        ) {
          console.log('--second');
          if (
            typeof this.parent.parent.parent.parent.first !=
              'number' &&
            this.parent.parent.parent.parent.first ==
              this.parent.parent.parent
          ) {
            console.log('---first');
          }

          if (
            typeof this.parent.parent.parent.parent
              .second != 'number' &&
            this.parent.parent.parent.parent.second ==
              this.parent.parent.parent
          ) {
            console.log('---second');
          }
        }
      }
    }
  }

  split() {
    return true;
  }
}
