export class Line {
  constructor(line) {
    this.line = this.create(line);
  }

  bracketMap = {
    '}': '{',
    ')': '(',
    '>': '<',
    ']': '[',
    '{': '}',
    '(': ')',
    '<': '>',
    '[': ']',
  };

  line;

  bracketTypes = ['[', '(', '{', '<'];
  counter = {
    '[': 0,
    '{': 0,
    '<': 0,
    '(': 0,
  };

  pointmap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  scoremap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  };

  analyse() {
    const bracketsSeen = [];
    const line = this.line;
    const [firstProblem] = line
      .map((char) => {
        if (this.bracketTypes.includes(char)) {
          bracketsSeen.unshift(char);
        } else {
          if (this.bracketMap[char] !== bracketsSeen[0]) {
            return char;
          }
          bracketsSeen.shift();
        }
      })
      .filter((item) => item != null);

    const remaining = bracketsSeen
      .map((bracket) => {
        return this.bracketMap[bracket];
      })
      .join('');

    const count = remaining
      .split('')
      .reduce((acc, curr) => {
        return acc * 5 + this.scoremap[curr];
      }, 0);

    const corrupted = this.pointmap[firstProblem] ?? null;
    const incomplete = !corrupted ? count : null;

    return [corrupted, incomplete];
  }

  create(line) {
    return line.split('');
  }

  get length() {
    return this.line.length;
  }
}
