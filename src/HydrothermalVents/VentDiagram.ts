export class VentDiagram {
  constructor(lines) {
    this.lines = lines;
    this.create();
  }

  private lines;
  private array;

  create() {
    this.createEmptyDiagram(this.findSizeOfDiagram());
    this.lines.map((line) => {
      this.addLineToDiagram(line);
    });
    // this.outputDiagramToTerminal();
  }

  createEmptyDiagram([height, width]: [number, number]) {
    this.array = [];

    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push('.');
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
    const currentDigit = this.array[y][x];
    if (currentDigit == '.') {
      this.array[y][x] = 1;
    } else {
      this.array[y][x]++;
    }
  }

  findOverlaps() {
    return this.array.reduce(
      (rowAcc, currRow) =>
        rowAcc +
        currRow.reduce((cellAcc, currCell) => {
          if (currCell !== '.' && currCell > 1) {
            return cellAcc + 1;
          }
          return cellAcc;
        }, 0),
      0,
    );
  }

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

  get numberOfOverlaps() {
    return this.findOverlaps();
  }

  outputDiagramToTerminal() {
    const display = this.array
      .map((row) => row.join(''))
      .join('\n');
    console.log(display);
  }
}
