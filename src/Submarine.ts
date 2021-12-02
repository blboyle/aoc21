/** @format */

export class Submarine {
  constructor() {}

  sonarSweep(input) {
    const regexString = /(\d+)\w/;
    return input
      .split('\n')
      .map((line) => line.trim().match(regexString))
      .filter((item) => item != null)
      .map((item) => Number(item[0]));
  }
}
