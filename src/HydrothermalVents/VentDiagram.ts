import { Point } from './Point';

export class VentDiagram {
  constructor(lines) {
    this.lines = lines;
    this.createEmptyDiagram(this.findSizeOfDiagram());
    this.lines.map((line) => {
      this.addLineToDiagram(line);
    });
    // this.outputDiagramToTerminal();
  }

  private lines;
  private array;

  findSizeOfDiagram(): [number, number] {
    const flatX = this.lines.flatMap(({ start, end }) => [
      start[0],
      end[0],
    ]);

    const flatY = this.lines.flatMap(({ start, end }) => [
      start[1],
      end[1],
    ]);

    const height = Math.max(...flatX) + 1;
    const width = Math.max(...flatY) + 1;

    return [width, height];
  }

  createEmptyDiagram([height, width]: [number, number]) {
    this.array = [];

    for (let i: number = 0; i < height; i++) {
      let row = [];
      for (let j: number = 0; j < width; j++) {
        row.push(new Point([i, j]));
      }
      this.array.push(row);
    }
  }

  addLineToDiagram(line) {
    const {
      start: [startX, startY],
      end: [endX, endY],
    } = line;

    if (line.isDiagonal) {
      let y = startY;
      let x = startX;

      if (endY > startY) {
        if (endX > startX) {
          while (x <= endX && y <= endY) {
            this.updatePoint(x, y);
            y++;
            x++;
          }
        } else {
          while (x >= endX && y <= endY) {
            this.updatePoint(x, y);
            y++;
            x--;
          }
        }
      } else {
        if (endX > startX) {
          while (x <= endX && y >= endY) {
            this.updatePoint(x, y);
            y--;
            x++;
          }
        } else {
          while (x >= endX && y >= endY) {
            this.updatePoint(x, y);
            y--;
            x--;
          }
        }
      }
    }

    if (line.isVertical) {
      if (startX < endX) {
        for (let x = startX; x <= endX; x++) {
          this.updatePoint(x, startY);
        }
      } else {
        for (let x = startX; x >= endX; x--) {
          this.updatePoint(x, startY);
        }
      }
    }

    if (line.isHorizontal) {
      if (startY < endY) {
        for (let y = startY; y <= endY; y++) {
          this.updatePoint(startX, y);
        }
      } else {
        for (let y = startY; y >= endY; y--) {
          this.updatePoint(startX, y);
        }
      }
    }
  }

  updatePoint(x, y) {
    const point = this.array[y][x];
    point.increaseCount();
  }

  outputDiagramToTerminal() {
    const display = this.array
      .map((row) => row.join(''))
      .join('\n');
    console.log(display);
  }

  get numberOfOverlaps() {
    return this.array.reduce(
      (rowAcc, currRow) =>
        rowAcc +
        currRow.reduce((pointAcc, currPoint) => {
          if (currPoint.hasThisManyOverlaps(2)) {
            return pointAcc + 1;
          }
          return pointAcc;
        }, 0),
      0,
    );
  }
}
