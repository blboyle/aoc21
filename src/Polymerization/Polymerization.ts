export class Polymerization {
  constructor({ input }) {
    this.input = input;
    this.makeStarting();
    this.makeMap();
  }

  starting;
  current;
  map;
  input;

  currentCharMap = {};
  static hashTable = {};

  makeStarting() {
    const [code] = this.input.split('\n\n');
    this.starting = code;
  }

  makeMap() {
    const [_, code] = this.input.split('\n\n');
    const keyMap = {};

    code
      .split('\n')
      .map((row) => row.split(' -> '))
      .map(([k, v]) => {
        keyMap[k] = v;
      });

    this.map = keyMap;
  }

  insertLetters(input) {
    return input.map((part) => {
      const [before, after] = part.split('');

      return `${before}${this.getItemToInsert({
        before,
        after,
      })}${after}`;
    });
  }

  getItemToInsert({ before, after }) {
    const char1 = before[before.length - 1];
    const char2 = after[0];

    return this.map[`${char1}${char2}`];
  }

  mostCommonElements() {
    this.starting.split('').map((char) => {
      if (this.currentCharMap[char] != undefined) {
        this.currentCharMap[char]++;
      } else {
        this.currentCharMap[char] = 0;
      }
    });

    const charArray = Object.keys(this.currentCharMap)
      .map((key) => {
        return [key, this.currentCharMap[key]];
      })
      .sort((a, b) => {
        if (a[1] == b[1]) return 0;
        return a[1] > b[1] ? -1 : 1;
      });

    return charArray;
  }

  getStringParts(string) {
    return string
      .split('')
      .map((char, i, array) => {
        if (i > 0) {
          return `${array[i - 1]}${char}`;
        }
      })
      .filter((item) => item != null);
  }

  rebuild(parts) {
    const newParts = parts.map((part, i) => {
      const item =
        i != 0
          ? part.split('').splice(1, 2).join('')
          : part;
      return item;
    });
    return newParts.join('');
  }

  findDescendents({
    string,
    step,
  }: {
    string: string;
    step: number;
  }) {
    step--;
    console.log({ step, string });

    const stringParts = this.getStringParts(string);
    const parts = this.insertLetters(stringParts);

    console.log({ stringParts, parts });

    if (step > 0) {
      this.findDescendents({ string, step });
    }

    const rebuild = this.rebuild(parts);
    console.log({ stringParts, parts });

    return rebuild;
    let newArray = [];

    step--;

    // let newString = this.insertLetters({ string });

    let arrayWithExtra = stringParts.flatMap((part) => {
      const [before, after] = part.split('');
      return `${before}${this.getItemToInsert({
        before,
        after,
      })}${after}`;
    });

    // console.log({ arrayWithExtra });

    console.log('step', step, string, arrayWithExtra);

    newArray = arrayWithExtra;

    if (step > 0) {
      arrayWithExtra.map((part) => {
        // console.log({ part }, '----');

        const returnArray =
          Polymerization.hashTable != undefined &&
          Polymerization.hashTable[part] != undefined
            ? Polymerization.hashTable['']
            : this.findDescendents({
                string: part,
                step,
              });

        newArray.push(returnArray);

        // console.log({ step, newArray });

        // console.log({ part }, '----');
      });
    }

    const stringToReturnArray = arrayWithExtra.map(
      (item, i, array) => {
        const amountToTake = i < array.length - 1 ? 1 : 0;
        return item.slice(0, item.length - amountToTake);
      },
    );

    let stringToReturn = stringToReturnArray.join('');

    // console.log({ stringToReturn });

    this.addToHashTable(step, string, stringToReturn);

    return stringToReturn;
  }

  addToHashTable(step, part, value) {
    if (Polymerization.hashTable[part] == undefined) {
      Polymerization.hashTable[part] = {};
    }

    Polymerization.hashTable[part] = value;
  }

  getNthStep({ steps = 5 }) {
    const answer = this.findDescendents({
      string: this.starting,
      step: steps,
    });
    // console.log({ steps, table: Polymerization.hashTable });

    const mostCommonChars = this.mostCommonElements();

    return { mostCommonChars, answer };
  }

  get totals() {
    return 10;
  }
}
