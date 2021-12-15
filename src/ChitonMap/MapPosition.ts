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
  static max = 10;

  findAllPaths(path = []) {
    MapPosition.max--;
    // console.log(this.location, this.riskLevel);

    // console.log({ MapPosition });
    if (
      this.location[0] == this.map.size[0] &&
      this.location[1] == this.map.size[1]
    ) {
      return [];
    }

    console.log({ path });
    // console.log('hi');

    // console.log({ n, s, w, e });

    if (MapPosition.max > 0) {
      const lowest = this.nextFourPoints(path);
      //   while (nextPoints.length > 0) {
      //     let i = Math.floor(
      //       Math.random() * nextPoints.length,
      //     );

      let newPath = [...path];
      newPath.push(this.location.toString());
      lowest.findAllPaths(newPath);

      //   }
    }

    // const [lowestItem] = nextPoints;

    // const lowest = nextPoints.filter((point) => {
    //   return point.riskLevel == lowestItem.riskLevel;
    // });

    // console.log({ lowest });

    // const nextValueIndex = Math.floor(
    //   Math.random() * lowest.length,
    // );

    // let totals = [];

    // nextStop.map((point) => {
    //   totals.push(point.findAllPaths());
    // });

    // console.log({ lowest, sortedRisks, n, s, e, w });

    // return (
    //   Number(this.riskLevel) +
    //   Number(lowest[nextValueIndex].findAllPaths(path))
    // );

    // console.log({ lowest });
  }

  nextFourPoints(path) {
    const map = this.map.mapArray;
    const [x, y] = this.location;

    const e =
      map[y] != undefined && map[y][x + 1] != undefined
        ? map[y][x + 1]
        : null;

    const s =
      map[y + 1] != undefined ? map[y + 1][x] : null;
    // console.log({ s });
    const [sortedRisks] = [s, e]
      .filter((item) => item != null)
      .filter(({ location }) => {
        // console.log({ path, location });
        return !path.includes(location.toString());
      })
      .sort((a, b) => {
        if (a.riskLevel == b.riskLevel) return 0;
        return a.riskLevel > b.riskLevel ? 1 : -1;
      })
      .filter((item, i, list) => {
        return item.riskLevel == list[0].riskLevel;
      })
      .sort((a, b) => {
        if (a.location[1] == b.location[1]) return 0;
        return a.location[1] > b.location[1] ? -1 : 1;
      });

    // console.log({ sortedRisks });
    return sortedRisks;
  }
}
