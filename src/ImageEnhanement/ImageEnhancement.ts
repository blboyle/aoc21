export class ImageEnhancement {
  constructor({ input }) {
    this.algorithm = this.makeAlgorithm({ input });
    this.imageInput = this.makeImageInput({ input });
  }

  algorithm;
  imageInput;
  canvas;
  count;
  step;
  infiniteIndex;
  infinityString = '.';

  static bufferAmount = 10;

  performEnhancement() {
    let buffer = ImageEnhancement.bufferAmount;
    let yLength = this.imageInput.length + buffer;
    let xLength = this.imageInput[0].length + buffer;
    let tempCanvas = [];

    for (let y = -buffer; y < yLength; y++) {
      let tempRow = [];
      for (let x = -buffer; x < xLength; x++) {
        const index = this.findIndexInAlgorithm({
          x,
          y,
        });

        tempRow.push(this.algorithm[index]);
      }

      tempCanvas.push(tempRow);
    }

    this.imageInput = [...tempCanvas];
  }

  enhance({ count, trim = false }) {
    const buffer = ImageEnhancement.bufferAmount;
    this.count = count;

    for (
      this.step = 0;
      this.step < this.count;
      this.step++
    ) {
      this.infiniteIndex = this.step % 2 == 0 ? 511 : 0;

      this.infinityString =
        this.step > 0 && this.algorithm[0] == '#'
          ? this.algorithm[this.infiniteIndex]
          : '.';

      this.performEnhancement();

      if (trim && (this.step - 1) % 2 == 0) {
        this.imageInput = this.imageInput
          .map((row, y) => {
            if (
              y < buffer ||
              y > this.imageInput.length - buffer
            ) {
              return null;
            }
            return row
              .map((cell, x) => {
                if (
                  x < buffer ||
                  x >
                    this.imageInput[0].length -
                      (ImageEnhancement.bufferAmount + 1)
                ) {
                  return null;
                }
                return cell;
              })
              .filter((item) => item != null);
          })
          .filter((item) => item != null);
      }
    }

    const litPixels = this.countLitPixels();
    return {
      litPixels,
    };
  }

  findIndexInAlgorithm({ x, y }) {
    let binaryString = '';
    let image = this.imageInput;

    const infinityString = this.infinityString;

    let nw =
      image[y - 1] != undefined &&
      image[y - 1][x - 1] != undefined
        ? image[y - 1][x - 1]
        : infinityString;

    let n =
      image[y - 1] != undefined
        ? image[y - 1][x]
        : infinityString;

    let ne =
      image[y - 1] != undefined &&
      image[y - 1][x + 1] != undefined
        ? image[y - 1][x + 1]
        : infinityString;

    let w =
      image[y] != undefined && image[y][x - 1] != undefined
        ? image[y][x - 1]
        : infinityString;

    let c =
      image[y] != undefined && image[y][x] != undefined
        ? image[y][x]
        : infinityString;

    let e =
      image[y] != undefined && image[y][x + 1] != undefined
        ? image[y][x + 1]
        : infinityString;

    let sw =
      image[y + 1] != undefined &&
      image[y + 1][x - 1] != undefined
        ? image[y + 1][x - 1]
        : infinityString;

    let s =
      image[y + 1] != undefined
        ? image[y + 1][x]
        : infinityString;

    let se =
      image[y + 1] != undefined &&
      image[y + 1][x + 1] != undefined
        ? image[y + 1][x + 1]
        : infinityString;

    let binaryMap = [nw, n, ne, w, c, e, sw, s, se];

    binaryMap.map((item) => {
      binaryString += item == '#' ? '1' : '0';
    });

    return parseInt(binaryString, 2);
  }

  displayDiagram(imageArray) {
    const diagram = imageArray
      .map((row) => row.join(''))
      .join('\n');
    console.log(diagram);
  }

  makeAlgorithm({ input }) {
    const [algorithm] = input.split('\n\n');
    return algorithm;
  }

  makeImageInput({ input }) {
    const [_, imageInput] = input.split('\n\n');
    return imageInput
      .split('\n')
      .map((row) => row.split(''));
  }
  countLitPixels() {
    return this.imageInput.reduce(
      (acc, row, i, input) =>
        acc +
        row.reduce(
          (acc2, cell, j) => acc2 + (cell == '#' ? 1 : 0),
          0,
        ),
      0,
    );
  }
}
