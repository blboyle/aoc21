export class Point {
  constructor([x, y]) {
    this.x = x;
    this.y = y;
    this.value = '.';
  }

  x: number;
  y: number;
  value: number | '.';

  increaseCount() {
    if (this.value == '.') {
      this.value = 1;
    } else {
      this.value++;
    }
  }

  hasThisManyOverlaps(amount = 1) {
    return this.value !== '.' && this.value >= amount;
  }
}
