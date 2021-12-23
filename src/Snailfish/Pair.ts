import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Snailfish } from './Snailfish';
import { SnailfishPod } from './SnailfishPod';

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
    const a = typeof this.first == 'number' ? this.first : this.first.toString;
    const b =
      typeof this.second == 'number' ? this.second : this.second.toString;
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
    SnailfishPod.tracking.push({
      step: 'explode',
      code: JSON.stringify(this.toString),
    });
    return true;
  }

  checkDepth({ depth }) {
    const keepChecking = depth++;
    // console.log('checkDepth', depth, {
    //   f: this.first,
    //   s: this.second,
    // });

    let returnValue = false;

    if (depth == 4 && this instanceof Pair) {
      console.log(depth, 'explode something');
      if (this.first instanceof Pair) {
        // console.log('explode first', this.first);
        this.first.findPrevRealNumber();
        this.first.findNextRealNumber();
        this.first = 0;
      } else if (this.second instanceof Pair) {
        // console.log('explode second', this.second);
        this.second.findPrevRealNumber();
        this.second.findNextRealNumber();
        this.second = 0;
      }
      return true;
    }

    if (this.first instanceof Pair) {
      returnValue = this.first.checkDepth({ depth });
    }

    if (this.second instanceof Pair) {
      returnValue = returnValue
        ? returnValue
        : this.second.checkDepth({ depth });
    }

    return returnValue;
  }
  findPrevRealNumber() {
    console.log('prev', this);

    if (typeof this.parent.second != 'number' && this == this.parent.second) {
      console.log('is second');
      if (typeof this.parent.first == 'number') {
        this.parent.first = this.first + this.parent.first;
      }
    }

    if (typeof this.parent.first != 'number' && this == this.parent.first) {
      console.log('is first');
      if (
        typeof this.parent.parent.first != 'number' &&
        this.parent == this.parent.parent.first
      ) {
        console.log('is grand first');
      }

      if (
        typeof this.parent.parent.second != 'number' &&
        this.parent == this.parent.parent.second
      ) {
        console.log('is grand second');

        if (typeof this.parent.parent.first == 'number') {
          console.log('is number');

          this.parent.parent.first = this.parent.parent.first + this.first;
        }
      }
    }
  }

  findNextRealNumber() {
    // check if this pair is the first of its parent

    const parent = this.parent;
    const grandparent = this.parent.parent;
    const greatgrandparent = this.parent.parent.parent;
    const elder = this.parent.parent.parent.parent;

    console.log(this.first, this.second);

    if (typeof parent.first != 'number' && this == parent.first) {
      // if so, if its parent's second value is a number, proceed.

      console.log("this is the parent's first, find value in parent's 2nd.");

      if (typeof parent.second == 'number') {
        parent.second = this.second + parent.second;
      }
    }

    // check if this pair is the second of its parent

    if (typeof parent.second != 'number' && this == parent.second) {
      // check if this pair's parent is the first of its parent

      console.log("this is the parent's second, find value in grandparent.");

      if (typeof grandparent.first != 'number' && grandparent.first == parent) {
        console.log(
          "this is the grandparent's first, find value in grandparent's second.",
        );
      }

      // check if this pair's parent is the second of its parent

      if (
        typeof grandparent.second != 'number' &&
        grandparent.second == parent
      ) {
        // check if this pair's grandparent is the first of its parent

        console.log(
          "this is the grandparent's second, find value in greatgrandparent.",
        );

        if (
          typeof greatgrandparent.first != 'number' &&
          greatgrandparent.first == grandparent
        ) {
          // check if this pair's great-grandparent is the first of its parent

          console.log(
            "this is the greatgrandparent's first, find value in greatgrandparent's second.",
          );

          if (
            typeof elder.first != 'number' &&
            elder.first == greatgrandparent
          ) {
            console.log(
              "this is the elder's first, find value in elder's second.",
            );
          }

          if (
            typeof elder.second != 'number' &&
            elder.second == greatgrandparent
          ) {
            console.log(
              "this is the elder's second, find value in elder's second.",
            );
          }
        }

        // check if this pair's grandparent is the second of its parent

        if (
          typeof greatgrandparent.second != 'number' &&
          greatgrandparent.second == grandparent
        ) {
          console.log(
            "this is the greatgrandparent's second, find value in elder.",
          );
          if (
            typeof elder.first != 'number' &&
            elder.first == greatgrandparent
          ) {
            console.log(
              "this is the elder's first, find value in elder's second.",
            );

            if (
              typeof elder.second == 'number' &&
              elder.first == greatgrandparent
            ) {
              elder.second = elder.second + this.second;
              console.log("this is the elder's second");
            }
          }

          if (
            typeof elder.second != 'number' &&
            elder.second == greatgrandparent
          ) {
            console.log("this is the elder's second, find value in elder's .");
          }

          if (
            typeof elder.first != 'number' &&
            elder.first == this.parent.parent.parent
          ) {
            if (typeof elder.second.first == 'number') {
              elder.second.first = elder.second.first + this.second;
            } else {
              // if (
              //   typeof elder.second.first.first == 'number'
              // ) {
              // } else {
              //   if (
              //     typeof elder.second.first.first.first ==
              //     'number'
              //   ) {
              //   } else {
              //   }
              // }
            }

            // start checking root's second value;
          }

          if (
            typeof elder.second != 'number' &&
            elder.second == greatgrandparent
          ) {
          }
        }
      }
    }
  }

  performSplit({ num, parent }) {
    if (typeof num == 'number' && num > 9) {
      console.log({ num });
      console.log([Math.floor(num / 2), Math.ceil(num / 2)]);
      let pairRaw = [Math.floor(num / 2), Math.ceil(num / 2)];
      return new Pair({ pair: pairRaw, parent });
    }
    return num;
  }

  split() {
    console.log('splitting', this);

    //----------LEVEL 1

    if (typeof this.first == 'number') {
      this.first = this.performSplit({ num: this.first, parent: this });
    } else {
      //----------LEVEL 2

      if (typeof this.first.first == 'number') {
        this.first.first = this.performSplit({
          num: this.first.first,
          parent: this.first,
        });
      } else {
        //----------LEVEL 3

        if (typeof this.first.first.first == 'number') {
          this.first.first.first = this.performSplit({
            num: this.first.first.first,
            parent: this.first.first,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.first.first.first.first == 'number') {
            this.first.first.first.first = this.performSplit({
              num: this.first.first.first.first,
              parent: this.first.first.first,
            });
          }

          if (typeof this.first.first.first.second == 'number') {
            this.first.first.first.second = this.performSplit({
              num: this.first.first.first.second,
              parent: this.first.first.first,
            });
          }
        }

        //----------LEVEL 3

        if (typeof this.first.first.second == 'number') {
          this.first.first.second = this.performSplit({
            num: this.first.first.second,
            parent: this.first.first,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.first.first.second.first == 'number') {
            this.first.first.second.first = this.performSplit({
              num: this.first.first.second.first,
              parent: this.first.first.second,
            });
          }

          if (typeof this.first.first.second.second == 'number') {
            this.first.first.second.second = this.performSplit({
              num: this.first.first.second.second,
              parent: this.first.first.second,
            });
          }
        }
      }

      //----------LEVEL 2

      if (typeof this.first.second == 'number') {
        this.first.second = this.performSplit({
          num: this.first.second,
          parent: this.first,
        });
      } else {
        //----------LEVEL 3

        if (typeof this.first.second.first == 'number') {
          this.first.second.first = this.performSplit({
            num: this.first.second.first,
            parent: this.first.second,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.first.second.first.first == 'number') {
            this.first.second.first.first = this.performSplit({
              num: this.first.second.first.first,
              parent: this.first.second.first,
            });
          }

          if (typeof this.first.second.first.second == 'number') {
            this.first.second.first.second = this.performSplit({
              num: this.first.second.first.second,
              parent: this.first.second.first,
            });
          }
        }

        //----------LEVEL 3

        if (typeof this.first.second.second == 'number') {
          this.first.second.second = this.performSplit({
            num: this.first.second.second,
            parent: this.first.second,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.first.second.second.first == 'number') {
            this.first.second.second.first = this.performSplit({
              num: this.first.second.second.first,
              parent: this.first.second.second,
            });
          }

          if (typeof this.first.second.second.second == 'number') {
            this.first.second.second.second = this.performSplit({
              num: this.first.second.second.second,
              parent: this.first.second.second,
            });
          }
        }
      }
    }

    //----------LEVEL 1

    if (typeof this.second == 'number') {
      this.second = this.performSplit({
        num: this.second,
        parent: this,
      });
    } else {
      //----------LEVEL 2

      if (typeof this.second.first == 'number') {
        this.second.first = this.performSplit({
          num: this.second.first,
          parent: this.second,
        });
      } else {
        //----------LEVEL 3

        if (typeof this.second.first.first == 'number') {
          this.second.first.first = this.performSplit({
            num: this.second.first.first,
            parent: this.second.first,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.second.first.first.first == 'number') {
            this.second.first.first.first = this.performSplit({
              num: this.second.first.first.first,
              parent: this.second.first.first,
            });
          }

          if (typeof this.second.first.first.second == 'number') {
            this.second.first.first.second = this.performSplit({
              num: this.second.first.first.second,
              parent: this.second.first.first,
            });
          }
        }

        //----------LEVEL 3

        if (typeof this.second.first.second == 'number') {
          this.second.first.second = this.performSplit({
            num: this.second.first.second,
            parent: this.second.first,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.second.first.second.first == 'number') {
            this.second.first.second = this.performSplit({
              num: this.second.first.second,
              parent: this.second.first,
            });
          }

          if (typeof this.second.first.second.second == 'number') {
            this.second.first.second.second = this.performSplit({
              num: this.second.first.second.second,
              parent: this.second.first.second,
            });
          }
        }
      }

      //----------LEVEL 2

      if (typeof this.second.second == 'number') {
        this.second.second = this.performSplit({
          num: this.second.second,
          parent: this.second,
        });
      } else {
        //----------LEVEL 3

        if (typeof this.second.second.first == 'number') {
          this.second.second.first = this.performSplit({
            num: this.second.second.first,
            parent: this.second.second,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.second.second.first.first == 'number') {
            this.second.second.first.first = this.performSplit({
              num: this.second.second.first.first,
              parent: this.second.second.first,
            });
          }

          if (typeof this.second.second.first.second == 'number') {
            this.second.second.first.second = this.performSplit({
              num: this.second.second.first.second,
              parent: this.second.second.first,
            });
          }
        }

        //----------LEVEL 3

        if (typeof this.second.second.second == 'number') {
          this.second.second.second = this.performSplit({
            num: this.second.second.second,
            parent: this.second.second,
          });
        } else {
          //----------LEVEL 4

          if (typeof this.second.second.second.first == 'number') {
            this.second.second.second.first = this.performSplit({
              num: this.second.second.second.first,
              parent: this.second.second.second,
            });
          }

          if (typeof this.second.second.second.second == 'number') {
            this.second.second.second.second = this.performSplit({
              num: this.second.second.second.second,
              parent: this.second.second.second,
            });
          }
        }
      }
    }

    SnailfishPod.tracking.push({
      step: '-split-',
      code: JSON.stringify(this.toString),
    });
    return true;
  }
}
