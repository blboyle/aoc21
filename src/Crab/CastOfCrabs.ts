import { Crab } from './Crab';

export class CastOfCrabs {
  constructor(input) {
    this.crabs = input
      .split(',')
      .map((number) => new Crab(number));
    this.maxPosition = this.crabs.reduce(
      (acc, { horizontalPosition: h }) =>
        h > acc ? Number(h) : acc,
      0,
    );
  }

  crabs = [];
  maxPosition;

  findAllFuelCosts(method) {
    let allFuelCosts = [];

    for (let i = 1; i <= this.maxPosition; i++) {
      const position = i + 1;
      const crabsFuelCost = this.crabs.reduce(
        (fuelCostAcc, crab) =>
          fuelCostAcc +
          crab.fuelCostToTravelTo(position, method),
        0,
      );
      allFuelCosts.push(crabsFuelCost);
    }
    return allFuelCosts;
  }
}
