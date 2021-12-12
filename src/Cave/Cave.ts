import { PathSegment } from './PathSegment';

export class Cave {
  constructor({ input }) {
    this.createSegments(input);
    // console.log(this.segments);
  }

  map;
  segments;
  numberOfVisits;
  foundPaths = [];
  visitedTwice = [];
  currentPath = [];

  static canVisitTwice;
  createSegments(input) {
    const segments = input.split('\n').map((path) => {
      let [start, end] = path.split('-');
      // console.log({ start, end });
      if (end == 'start') {
        let temp = start;
        start = end;
        end = temp;
        // console.log("flipped", { start, end });
      }
      return new PathSegment({ cave: this, start, end });
    });

    this.segments = segments;
  }

  findTotalPaths() {
    const [{ start }] = this.segments.filter(
      (segment) => segment.isStart,
    );

    start.continuePath();
    // console.log(this.foundPaths, this.foundPaths.length);
  }

  getNumberOfPaths() {
    // Cave.canVisitTwice = double;
    this.findTotalPaths();
    return this.foundPaths.length;
  }
}
