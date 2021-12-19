import { Pair } from './Pair';

export class Snailfish {
  constructor({ input }) {
    this.fish = new Pair({ pair: input });
  }
  fish;
}
