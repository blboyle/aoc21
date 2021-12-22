import { Player } from './Player';
import { Dice } from './Dice';

export class Game {
  constructor({ input, isDeterministic, max }) {
    const [one, two] = this.createStartingPoint({
      input,
    });
    this.startingLocations = {
      player1: one,
      player2: two,
    };
    this.dice = new Dice({ isDeterministic });
    this.player1 = new Player({
      name: 'one',
      dice: this.dice,
      starting: one,
    });
    this.player2 = new Player({
      name: 'two',
      dice: this.dice,
      starting: two,
    });
    this.winningThreshold = max;
  }

  hastable = {};

  winningThreshold;
  startingLocations;
  currentPlayer;
  player1;
  player2;
  dice;
  rollAmount;
  keepPlaying;
  plays = 0;

  playTurn() {
    this.currentPlayer.playTurn();

    if (this.currentPlayer.score >= this.winningThreshold) {
      this.keepPlaying = false;
      console.log('game over, player 1 winner');
    }
  }

  playQTurn({ score, location, roll, turn }) {
    this.plays++;
    let count = { player1: 0, player2: 0 };
    let newScore = { ...score };
    let newLocation = { ...location };
    turn++;

    const currentPlayer =
      (turn - 1) % 2 == 0 ? 'player1' : 'player2';

    newLocation[currentPlayer] =
      newLocation[currentPlayer] + roll > 10
        ? newLocation[currentPlayer] + roll - 10
        : newLocation[currentPlayer] + roll;

    newScore[currentPlayer] += newLocation[currentPlayer];

    if (newScore.player1 >= 21 || newScore.player2 >= 21) {
      if (newScore.player1 > newScore.player2) {
        ++count.player1;
        return count;
      }
      if (newScore.player2 > newScore.player1) {
        ++count.player2;
        return count;
      }
    }

    const key = `${roll}--${newScore.player1}-${newScore.player2}`;

    if (this.hastable[key] != undefined) {
      return this.hastable[key];
    }

    let r1 = this.playQTurn({
      score: newScore,
      roll: 1,
      location: newLocation,
      turn,
    });
    let r2 = this.playQTurn({
      score: newScore,
      roll: 2,
      location: newLocation,
      turn,
    });
    let r3 = this.playQTurn({
      score: newScore,
      roll: 3,
      location: newLocation,
      turn,
    });

    [r1, r2, r3].map((newCount) => {
      count.player1 += newCount.player1;
      count.player2 += newCount.player2;
    });

    this.hastable[key] = count;

    return count;
  }

  playQuantum() {
    let count = { player1: 0, player2: 0 };
    let score = { player1: 0, player2: 0 };
    let location = {
      player1: this.startingLocations.player1,
      player2: this.startingLocations.player2,
    };
    let turn = 0;

    const r1 = this.playQTurn({
      score,
      roll: 1,
      location,
      turn,
    });
    const r2 = this.playQTurn({
      score,
      roll: 2,
      location,
      turn,
    });
    const r3 = this.playQTurn({
      score,
      roll: 3,
      location,
      turn,
    });

    [r1, r2, r3].map((newCount) => {
      count.player1 += newCount.player1;
      count.player2 += newCount.player2;
    });

    console.log({ count, plays: this.plays });

    return count.player1;
  }

  playGame() {
    this.keepPlaying = true;
    this.currentPlayer = this.player1;

    let plays = 10000;

    while (this.keepPlaying && plays > 0) {
      plays--;
      this.playTurn();

      this.currentPlayer =
        this.currentPlayer == this.player1
          ? this.player2
          : this.player1;
    }

    const numberOfDiceRolls = this.dice.nextRoll - 1;

    const [winner, loser] = [
      this.player1,
      this.player2,
    ].sort((a, b) => {
      if (a.score == b.score) return 0;
      return a.score > b.score ? -1 : 1;
    });

    return {
      scoreOfLosingPlayer: loser.score,
      numberOfDiceRolls,
    };
  }

  createStartingPoint({ input }) {
    const [one, two] = input
      .split('\n')
      .map((item) => item.split(': '));

    return [Number(one[1]), Number(two[1])];
  }

  get gamesWonByWinner() {
    console.log('hi');
    this.playQuantum();
    return 1000;
  }

  get answer() {
    const { scoreOfLosingPlayer, numberOfDiceRolls } =
      this.playGame();

    return scoreOfLosingPlayer * numberOfDiceRolls;
  }
}
