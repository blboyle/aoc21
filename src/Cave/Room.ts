import { Cave } from "./Cave";

export class Room {
  constructor(letter, cave) {
    this.letter = letter;
    this.cave = cave;
  }

  letter;
  cave;

  static hasVisitedTwiceList = [];

  get isBigRoom() {
    return this.letter == this.letter.upperCase();
  }

  continuePath(path = [], visitedTwice = [], hasVisitedTwice = false) {
    // console.log("continuePath", this.letter);
    // console.log({
    //   //   current: this.cave.currentPath,
    //   //   found: this.cave.foundPaths,
    // });

    if (
      path.includes(this.letter) &&
      Cave.canVisitTwice &&
      !visitedTwice.includes(this.letter) &&
      this.letter.toUpperCase() != this.letter &&
      !hasVisitedTwice
      //   this.letter != "start"
    ) {
      //   console.log(this.letter);
      visitedTwice.push(this.letter);
      hasVisitedTwice = true;
      //   console.log([visitedTwice]);
    }

    if (this.letter == "end") {
      let newPath = [...path];
      newPath.push(this.letter);
      this.cave.foundPaths.push(newPath.join("-"));
      hasVisitedTwice = false;
      //   Room.hasVisitedTwiceList = [];
      //   console.log({ foundPath: this.cave.foundPaths });
      return;
    }
    // this.cave.visited.push(this.letter);

    const nextRooms = this.cave.segments
      .filter(
        (segment) =>
          segment.start.letter == this.letter ||
          (segment.end.letter == this.letter && segment.start.letter != "start")
      )
      .map((segment) => {
        const {
          start: { letter: start },
          end: { letter: end },
        } = segment;
        // console.log({ start, end });

        let nextStop = this.letter != start ? segment.start : segment.end;
        return nextStop;
      })
      .filter(({ letter: choice }) => {
        // console.log({ choice });
        // console.log("visitedarray", this.cave.visited);

        const isStart = choice == "start";
        const alreadyVisited = path.includes(choice);
        const canVisitAlways = choice.toUpperCase() == choice;
        const canVisitTwice =
          alreadyVisited &&
          Cave.canVisitTwice &&
          !visitedTwice.includes(choice) &&
          !hasVisitedTwice;

        return !alreadyVisited || canVisitAlways || canVisitTwice;
      });

    // console.log("nextRooms", nextRooms);

    while (nextRooms.length > 0) {
      let i = Math.floor(Math.random() * nextRooms.length);

      let newPath = [...path];
      newPath.push(this.letter);
      nextRooms[i].continuePath(newPath, [...visitedTwice], hasVisitedTwice);
      nextRooms.splice(i, 1);
    }
  }
}
