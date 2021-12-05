type Point = [number, number];

export class Line {
  constructor(lineString) {
    const [start, end] = lineString
      .split(' -> ')
      .map((coordinate) => {
        return coordinate
          .split(',')
          .map((number) => Number(number));
      });
    this.start = start;
    this.end = end;
  }

  start: Point;
  end: Point;

  get isHorizontal() {
    return this.start[0] == this.end[0];
  }

  get isVertical() {
    return this.start[1] == this.end[1];
  }

  get isDiagonal() {
    const yDiff = this.end[0] - this.start[0];
    const xDiff = this.end[1] - this.start[1];
    return Math.abs(xDiff) == Math.abs(yDiff);
  }
}
