export class HeightMqp {
  constructor({ input }) {
    this.map = this.createMap({ input });
    this.findLowPoints();
    this.findBasins();
  }

  map;
  lows;
  basinsSizes;

  createMap({ input }) {
    return input
      .split('\n')
      .map((row) =>
        row.split('').map((num) => Number(num)),
      );
  }

  findBasins() {
    this.basinsSizes = this.lows.map((low) =>
      this.fillBasin(low),
    );
  }

  fillBasin(low) {
    const basinValuesToRead = [low];
    const knownBasinLocations = [];

    while (basinValuesToRead.length > 0) {
      const { location } = basinValuesToRead.shift();
      const basinNeighbours =
        this.findBasinNeighbours(location);

      basinNeighbours.map((neighbour) => {
        if (
          !knownBasinLocations.includes(
            neighbour.location.toString(),
          )
        ) {
          basinValuesToRead.push(neighbour);
          knownBasinLocations.push(
            neighbour.location.toString(),
          );
        }
      });
    }

    return knownBasinLocations.length;
  }

  findBasinNeighbours([x, y]) {
    const top =
      this.map[y - 1] && this.map[y - 1][x] < 9
        ? {
            location: [x, y - 1],
            value: this.map[y - 1][x],
          }
        : null;
    const left =
      this.map[y][x - 1] && this.map[y][x - 1] < 9
        ? {
            location: [x - 1, y],
            value: this.map[y][x - 1],
          }
        : null;
    const bottom =
      this.map[y + 1] && this.map[y + 1][x] < 9
        ? {
            location: [x, y + 1],
            value: this.map[y + 1][x],
          }
        : null;
    const right =
      this.map[y][x + 1] && this.map[y][x + 1] < 9
        ? {
            location: [x + 1, y],
            value: this.map[y][x + 1],
          }
        : null;

    const locations = [top, left, bottom, right].filter(
      (item) => item != null,
    );
    return locations;
  }

  findLowPoints() {
    const width = this.map[0].length;
    const height = this.map.length;
    const lows = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let val = this.map[y][x];
        let n =
          this.map[y - 1] == undefined
            ? false
            : this.map[y - 1][x] < val;
        let ne =
          this.map[y - 1] == undefined ||
          this.map[y][x + 1] == undefined
            ? false
            : this.map[y - 1][x + 1] < val;
        let e =
          this.map[y][x + 1] == undefined
            ? false
            : this.map[y][x + 1] < val;
        let se =
          this.map[y + 1] == undefined ||
          this.map[y][x + 1] == undefined
            ? false
            : this.map[y + 1][x + 1] < val;
        let s =
          this.map[y + 1] == undefined
            ? false
            : this.map[y + 1][x] < val;
        let sw =
          this.map[y + 1] == undefined ||
          this.map[y][x - 1] == undefined
            ? false
            : this.map[y + 1][x - 1] < val;
        let w =
          this.map[y][x - 1] == undefined
            ? false
            : this.map[y][x - 1] < val;
        let nw =
          this.map[y - 1] == undefined ||
          this.map[y][x - 1] == undefined
            ? false
            : this.map[y - 1][x - 1] < val;
        let isLowestAround =
          n || ne || e || se || s || sw || w || nw;

        if (!isLowestAround) {
          lows.push({ location: [x, y], value: val });
        }
      }
    }

    this.lows = lows;
  }

  get riskLevel() {
    return this.lows
      .map((item) => item.value)
      .reduce((acc, curr) => {
        return acc + curr + 1;
      }, 0);
  }

  get topThreeBasinProduct() {
    return this.basinsSizes
      .sort((a, b) => {
        if (a == b) return 0;
        return a > b ? -1 : 1;
      })
      .slice(0, 3)
      .reduce((acc, curr) => acc * curr, 1);
  }
}
