import { Room } from "./Room";

export class PathSegment {
  constructor({ cave, start, end }) {
    this.cave = cave;
    this.start = new Room(start, cave);
    this.end = new Room(end, cave);
  }

  cave;
  start;
  end;

  get isStart() {
    return this.start.letter == "start";
  }
}
