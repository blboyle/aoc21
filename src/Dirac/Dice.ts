export class Dice {
  constructor({ isDeterministic = false }) {
    this.isDeterministic = isDeterministic;
  }

  nextRoll = 1;

  isDeterministic;

  roll() {
    const currentRoll = this.nextRoll;
    this.nextRoll++;
    return currentRoll;
  }
}
