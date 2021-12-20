export class TransparentPaper {
  constructor({ input, folds = false }) {
    if (folds) {
      this.folds = folds;
    }
    this.mapInput({ input });
    this.foldInstructions({ input });
    this.foldPaper();
  }

  paperArray;
  foldSteps;
  dots;
  currentStep;
  diagram;
  afterFirstFold;
  folds;

  get code() {
    return this.diagram;
  }

  get countOfDots() {
    return this.countDots();
  }

  mapInput({ input }) {
    const [mapInstructions] = input.split('\n\n');
    this.dots = mapInstructions
      .split('\n')
      .map((item) =>
        item.split(',').map((num) => Number(num)),
      );
    const sizeOfArray = this.findSizeOfArray();
    this.paperArray = this.makeArray({ sizeOfArray });
    this.placeDots();
  }

  foldStep() {
    const sizeOfArray = this.findSizeOfArray();
    this.paperArray = this.makeArray({ sizeOfArray });
    this.placeDots();
  }

  foldPaper() {
    this.foldSteps.map((step, i) => {
      this.currentStep = step;
      if (!this.folds || (this.folds && i < this.folds)) {
        return this.foldStep();
      }
    });
    this.outputDiagram();
  }

  countDots() {
    return this.paperArray.reduce(
      (acc, row) =>
        acc +
        row.reduce(
          (acc2, point) => (point == '#' ? acc2 + 1 : acc2),
          0,
        ),
      0,
    );
  }

  placeDots() {
    const newDots = [];
    this.dots.map((dot) => {
      let x = dot[0];
      let y = dot[1];

      if (this.currentStep != null) {
        if (this.currentStep[0] == 'x') {
          if (x > this.currentStep[1]) {
            x =
              this.currentStep[1] -
              (x - this.currentStep[1]);
          }
        }
        if (this.currentStep[0] == 'y') {
          if (y > this.currentStep[1]) {
            y =
              this.currentStep[1] -
              (y - this.currentStep[1]);
          }
        }
      }

      newDots.push([x, y]);

      this.paperArray[y][x] = '#';
    });
    this.dots = newDots;
  }

  outputDiagram() {
    const diagram = this.paperArray
      .map((row) => row.join(''))
      .join('\n');
    this.countDots();
    this.diagram = diagram;
  }

  makeArray({ sizeOfArray }) {
    let temp = [];
    for (let y = 0; y <= sizeOfArray[1]; y++) {
      let row = [];
      for (let x = 0; x <= sizeOfArray[0]; x++) {
        row.push('.');
      }
      temp.push(row);
    }
    return temp;
  }

  findSizeOfArray() {
    let height = 0;
    let width = 0;

    this.dots.map((dot) => {
      if (dot[0] > width) {
        width = dot[0] + 1;
      }

      if (dot[1] > height) {
        height = dot[1] + 1;
      }
    });
    if (this.currentStep != null) {
      if (this.currentStep[0] == 'x') {
        width = Number(this.currentStep[1]);
      }
      if (this.currentStep[0] == 'y') {
        height = Number(this.currentStep[1]);
      }
    }
    return [width, height];
  }

  foldInstructions({ input }) {
    const [_, raw] = input.split('\n\n');
    const temp = raw
      .split('\n')
      .map((row) => row.split('along ')[1])
      .map((direction) => direction.split('='));
    this.foldSteps = temp;
  }
}
