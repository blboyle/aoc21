export class SegmentDisplay {
  constructor(code) {
    const [
      uniqueSignalPatternString,
      fourDigitOutputValueString,
    ] = code.split(' | ');
    this.uniqueSignalPattern =
      uniqueSignalPatternString.split(' ');
    this.fourDigitOutputValue =
      fourDigitOutputValueString.split(' ');

    // console.log(this.uniqueSignalPattern);

    this.codePattern = {
      top: this.findTop(),
      topLeft: this.findTopLeft(),
      topRight: this.findTopRight(),
      middle: this.findMiddle(),
      bottom: this.findBottom(),
      bottomLeft: this.findBottomLeft(),
      bottomRight: this.findBottomRight(),
      _middleAndUpLeft: this.middleAndTopLeft(),
      _topRightAndBottomRight:
        this.topRightAndBottomRight(),
      _bottomAndBottomLeft: this.bottomAndBottomLeft(),
    };

    this.makeDigits();

    this.decode();
  }
  codePattern;
  digits = {
    zero: null,
    one: null,
    two: null,
    three: null,
    four: null,
    five: null,
    six: null,
    seven: null,
    eight: null,
    nine: null,
  };

  uniqueSignalPattern = [];
  fourDigitOutputValue = [];

  decode() {
    const valueArray = Object.entries(this.digits);
    const numbers = [];

    // console.log({ valueArray });
    this.fourDigitOutputValue.map((digit) => {
      const possibilities = Object.entries(this.digits).map(
        (item, i) => i,
      );

      //   console.log({ possibilities });
      //   console.log('--');
      valueArray.map((value, i) => {
        if (value[1].length != digit.length) {
          possibilities[i] = null;
        }

        if (value[1].length == digit.length) {
          const digitArray = digit.split('');

          digitArray.map((char) => {
            if (!value[1].split('').includes(char)) {
              possibilities[i] = null;
            }
          });
        }
      });

      const [number] = possibilities.filter(
        (item) => item != null,
      );
      numbers.push(number);
    });
    return numbers.join('');
  }

  get code() {
    return Number(this.decode());
  }

  makeDigits() {
    this.uniqueSignalPattern.map((pattern) => {
      if (pattern.length == 2) {
        this.digits['one'] = pattern;
      }
      if (pattern.length == 3) {
        this.digits['seven'] = pattern;
      }
      if (pattern.length == 4) {
        this.digits['four'] = pattern;
      }
      if (pattern.length == 7) {
        this.digits['eight'] = pattern;
      }

      if (pattern.length == 5) {
        if (
          !pattern
            .split('')
            .includes(this.codePattern.topRight)
        ) {
          this.digits['five'] = pattern;
        }
        if (
          !pattern
            .split('')
            .includes(this.codePattern.bottomRight)
        ) {
          this.digits['two'] = pattern;
        }
        if (
          pattern
            .split('')
            .includes(this.codePattern.topRight) &&
          pattern
            .split('')
            .includes(this.codePattern.bottomRight)
        ) {
          this.digits['three'] = pattern;
        }
      }

      if (pattern.length == 6) {
        if (
          !pattern
            .split('')
            .includes(this.codePattern.middle)
        ) {
          this.digits['zero'] = pattern;
        }
        if (
          !pattern
            .split('')
            .includes(this.codePattern.bottomLeft)
        ) {
          this.digits['nine'] = pattern;
        }
        if (
          !pattern
            .split('')
            .includes(this.codePattern.topRight)
        ) {
          this.digits['six'] = pattern;
        }
      }
    });
    // console.log({ digits: this.digits });
  }

  findBottom() {
    const bottomLeft = this.findBottomLeft();
    const [bottom] = this.bottomAndBottomLeft()
      .split('')
      .filter((char) => char != bottomLeft);
    return bottom;
  }

  findBottomRight() {
    const topRight = this.findTopRight();
    const [bottomRight] = this.topRightAndBottomRight()
      .split('')
      .filter((char) => char != topRight);
    return bottomRight;
  }

  findBottomLeft() {
    const zeroSixNine = this.uniqueSignalPattern.filter(
      (item) => item.length == 6,
    );

    const [notBottomLeft] = zeroSixNine
      .map((number) => {
        return number.split('').filter((char) => {
          return this.bottomAndBottomLeft()
            .split('')
            .includes(char);
        });
      })
      .filter((item) => item.length == 1);

    const [bottomLeft] = this.bottomAndBottomLeft()
      .split('')
      .filter((char) => char != notBottomLeft);

    return bottomLeft;
  }

  findTopRight() {
    const zeroSixNine = this.uniqueSignalPattern.filter(
      (item) => item.length == 6,
    );

    const [notTopRight] = zeroSixNine
      .map((number) => {
        return number.split('').filter((char) => {
          return this.topRightAndBottomRight()
            .split('')
            .includes(char);
        });
      })
      .filter((item) => item.length == 1);

    const [topRight] = this.topRightAndBottomRight()
      .split('')
      .filter((char) => char != notTopRight);

    return topRight;
  }

  findTopLeft() {
    const middle = this.findMiddle();
    const [topLeft] = this.middleAndTopLeft()
      .split('')
      .filter((char) => char != middle);
    return topLeft;
  }

  findMiddle() {
    const zeroSixNine = this.uniqueSignalPattern.filter(
      (item) => item.length == 6,
    );

    const [notMiddle] = zeroSixNine
      .map((number) => {
        return number.split('').filter((char) => {
          return this.middleAndTopLeft()
            .split('')
            .includes(char);
        });
      })
      .filter((item) => item.length == 1);

    const [middle] = this.middleAndTopLeft()
      .split('')
      .filter((char) => char != notMiddle);

    return middle;
  }

  bottomAndBottomLeft() {
    const [eight] = this.uniqueSignalPattern.filter(
      (item) => item.length == 7,
    );

    return eight
      .split('')
      .filter((char) => {
        return !this.topRightAndBottomRight()
          .split('')
          .includes(char);
      })
      .filter((char) => {
        return !this.findTop().split('').includes(char);
      })
      .filter((char) => {
        return !this.middleAndTopLeft()
          .split('')
          .includes(char);
      })
      .join('');
  }

  middleAndTopLeft() {
    const [four] = this.uniqueSignalPattern.filter(
      (item) => item.length == 4,
    );

    return four
      .split('')
      .filter((char) => {
        return !this.topRightAndBottomRight()
          .split('')
          .includes(char);
      })
      .join('');

    console.log({ four });
  }

  topRightAndBottomRight() {
    const [seven] = this.uniqueSignalPattern.filter(
      (item) => item.length == 3,
    );
    return seven
      .split('')
      .filter((char) => {
        return char != this.findTop();
      })
      .join('');
  }

  findTop() {
    const [seven] = this.uniqueSignalPattern.filter(
      (item) => item.length == 3,
    );
    const [one] = this.uniqueSignalPattern.filter(
      (item) => item.length == 2,
    );

    const [top] = seven
      .split('')
      .filter((char) => !one.split('').includes(char));

    return top;
  }

  numberOfOnesInOutput(number) {
    return this.fourDigitOutputValue.filter(
      (value) => value.length == number,
    ).length;
  }

  get uniqueNumberCount() {
    let count = [2, 3, 4, 7]
      .map((num) => this.numberOfOnesInOutput(num))
      .reduce((acc, curr) => {
        return acc + curr;
      });
    return count;
  }
}
