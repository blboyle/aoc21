import { Pair } from './Pair';
import { Snailfish } from './Snailfish';

export class SnailfishPod {
  constructor({ input }) {
    SnailfishPod.tracking = [];
    this.pod = this.createPod({ input });
    this.sumPod();
  }

  pod;
  static tracking = [];

  createPod({ input }) {
    return input
      .split('\n')
      .map((row) => new Pair({ pair: JSON.parse(row), parent: this }));
  }

  steps(step) {
    // this.sumPod();
    // for (let i = 1; i <= step; i++) {
    //   console.log({ i });
    // }
    return { result: this.diagram() };
  }

  sumPod() {
    // console.log('-------');
    let sumPod = [...this.pod];
    // console.log({ sumPod, l: sumPod.length });
    while (sumPod.length > 1) {
      const newFish = this.add(sumPod[0], sumPod[1]);
      sumPod.splice(0, 2, newFish);
      // console.log({ sumPod: sumPod.toString() });
    }
  }

  add(a, b) {
    console.log('-add------');
    const newPair = new Pair({
      pair: [a, b],
      parent: this,
    });

    SnailfishPod.tracking.push({
      step: '--add--',
      code: JSON.stringify(newPair.toString),
    });

    return newPair.reducePair();
  }

  diagram() {
    const [diagram] = this.pod.map((item) => {
      return item.toString;
    });

    return JSON.stringify(diagram);
  }

  result(step) {
    console.log({ tracking: SnailfishPod.tracking });
    return SnailfishPod.tracking[step - 1].code;
  }

  get singleExplode() {
    this.pod[0].explode();
    return this.diagram();
  }
}
