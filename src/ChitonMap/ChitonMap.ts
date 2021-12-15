import { MapPosition } from './MapPosition';

export class ChitonMap {
  constructor({ input }) {
    console.log('creating chiton map');
    this.input = input;
    this.mapArray = this.createInitialMap();
    this.findRoutes();
  }

  mapArray;
  input;
  currentLocation = [0, 0];
  size;

  findRoutes() {
    const [x, y] = this.currentLocation;
    // const [x, y] = [8, 0];
    const paths = this.mapArray[y][x].findAllPaths();
    console.log({ paths });
  }

  createInitialMap() {
    const input = this.input;

    const map = input.split('\n').map((row, y) =>
      row.split('').map((riskLevel, x) => {
        return new MapPosition({
          riskLevel,
          location: [x, y],
          map: this,
        });
      }),
    );
    this.size = [map[0].length - 1, map.length - 1];
    return map;
  }
}
