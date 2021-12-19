import { Pair } from './Pair';
import { Snailfish } from './Snailfish';

export class SnailfishPod {
  constructor({ input }) {
    this.pod = this.createPod({ input });
    this.sumPod();
  }

  pod;

  createPod({ input }) {
    return input
      .split('\n')
      .map(
        (row) =>
          new Pair({ pair: JSON.parse(row), parent: this }),
      );
  }

  sumPod() {
    // console.log('-------');
    let sumPod = [...this.pod];
    while (sumPod.length > 6) {
      //   console.log('-adding------');
      const newFish = this.add(sumPod[0], sumPod[1]);
      sumPod.splice(0, 2, newFish);
      //   console.log({ sumPod: sumPod.toString() });
    }
  }

  add(a, b) {
    const newPair = new Pair({
      pair: [a, b],
      parent: this,
    });
    // console.log({ newPair });
    return newPair.reducePair();
  }

  diagram() {
    const [diagram] = this.pod.map((item) => {
      return item.toString;
    });

    return JSON.stringify(diagram);
  }

  get singleExplode() {
    this.pod[0].explode();
    return this.diagram();
  }
}
