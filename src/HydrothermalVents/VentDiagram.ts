export class VentDiagram {
  constructor(lines) {
    this.lines = lines;
    this.createDiagram(this.lines);
  }

  private lines;
  private stringOutput;
  private array;

  createDiagram(listOfLines) {
    const sizeOfDiagram = this.findSizeOfArray(listOfLines);

    let diagramArray = [];
    for (let i = 0; i < sizeOfDiagram[0]; i++) {
      let row = [];
      for (let j = 0; j < sizeOfDiagram[1]; j++) {
        row.push('.');
      }
      diagramArray.push(row);
    }

    const updatePosition = (x, y) => {
      const currentDigit = diagramArray[y][x];
      if (currentDigit == '.') {
        diagramArray[y][x] = 1;
      } else {
        diagramArray[y][x]++;
      }
    };

    const addLineToDiagram = (line) => {
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
              updatePosition(x, y);
              y++;
              x++;
            }
          } else {
            while (x >= endX && y <= endY) {
              updatePosition(x, y);
              y++;
              x--;
            }
          }
        } else {
          if (endX > startX) {
            while (x <= endX && y >= endY) {
              updatePosition(x, y);
              y--;
              x++;
            }
          } else {
            while (x >= endX && y >= endY) {
              updatePosition(x, y);
              y--;
              x--;
            }
          }
        }
      }

      if (line.isVertical) {
        if (startX < endX) {
          for (let x = startX; x <= endX; x++) {
            updatePosition(x, startY);
          }
        } else {
          for (let x = startX; x >= endX; x--) {
            updatePosition(x, startY);
          }
        }
      }

      if (line.isHorizontal) {
        if (startY < endY) {
          for (let y = startY; y <= endY; y++) {
            updatePosition(startX, y);
          }
        } else {
          for (let y = startY; y >= endY; y--) {
            updatePosition(startX, y);
          }
        }
      }
    };

    listOfLines.map(addLineToDiagram);

    this.stringOutput = diagramArray
      .map((row) => row.join(''))
      .join('\n');

    this.array = diagramArray;
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

  findSizeOfArray(list) {
    let width = 0;
    let height = 0;
    list.map((line) => {
      const { start, end } = line;
      if (start[0] > width) {
        width = start[0];
      }
      if (end[0] > width) {
        width = end[0];
      }
      if (start[1] > width) {
        height = start[1];
      }
      if (end[1] > width) {
        height = end[1];
      }
    });
    return [width + 1, height + 1];
  }

  get numberOfOverlaps() {
    return this.findOverlaps();
  }
}
