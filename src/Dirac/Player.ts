export class Player {
  constructor({ dice, starting, name }) {
    this.name = name;
    this.score = 0;
    this.rollAmount = 0;
    this.dice = dice;
    this.location = starting;
  }

  name;
  dice;
  rollAmount;
  location;
  score;

  rollDice() {
    const roll = this.dice.roll();
    // console.log({ rollAmount: roll });
    return roll;
  }

  playTurn() {
    for (let roll = 0; roll < 3; roll++) {
      this.rollAmount += this.rollDice();
    }
    let amountToMove = this.rollAmount % 10;

    // console.log(this.location, amountToMove);

    this.location =
      this.location + amountToMove > 10
        ? this.location + amountToMove - 10
        : this.location + amountToMove;

    this.score += this.location;

    // console.log({
    //   name: this.name,
    //   rollAmount: this.rollAmount,
    //   amountToMove,
    //   location: this.location,
    //   score: this.score,
    // });

    this.rollAmount = 0;
  }
}
