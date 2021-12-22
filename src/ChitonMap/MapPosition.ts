export class MapPosition {
  constructor({ riskLevel, location, map }) {
    this.location = location;
    this.riskLevel = Number(riskLevel);
    this.map = map;
  }

  location;
  riskLevel;
  map;
  trackMap;
  static visited = [];
  static max = 100;

  findAllPaths(path = []) {
    MapPosition.max--;
    console.log('finding all paths');
    if (
      this.location[0] == this.map.size[0] &&
      this.location[1] == this.map.size[1]
    ) {
      return [];
    }

    if (MapPosition.max > 0) {
      this.nextFourPoints(path, 0);
      let newPath = [...path];
      newPath.push(this.location.toString());
    }
  }

  nextFourPoints(path, depth) {
    let count = 0;
    depth++;
    // console.log('next four points', path);
    const map = this.map.mapArray;
    const [x, y] = this.location;
    let newPath = [...path, [x, y]];

    const e =
      map[y] != undefined && map[y][x + 1] != undefined
        ? map[y][x + 1]
        : null;

    const s =
      map[y + 1] != undefined ? map[y + 1][x] : null;

    const nextSteps = [s, e].filter((item) => item != null);

    for (let i = 0; i < nextSteps.length; i++) {
      MapPosition.max--;
      if (MapPosition.max > 0) {
        console.log({
          x,
          y,
          depth,
          nextSteps: nextSteps.length,
          i,
        });
        nextSteps[i].nextFourPoints(newPath, depth);
      }
    }

    console.log('end ', depth, { x, y });

    return count;
  }
}
