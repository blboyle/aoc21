export class Crab {
  constructor(horizontalPosition) {
    this.horizontalPosition = horizontalPosition;
  }

  horizontalPosition;

  fuelCostToTravelTo(position, fuelCostMethod) {
    const biggest = Math.max(
      this.horizontalPosition,
      position,
    );
    const smallest = Math.min(
      this.horizontalPosition,
      position,
    );

    const difference = biggest - smallest;

    if (fuelCostMethod == 'consistent') {
      return difference;
    }

    if (fuelCostMethod == 'linear') {
      let totalAmount = 0;
      let pricePerUnit = 1;

      for (let i = 0; i < difference; i++) {
        totalAmount += pricePerUnit;
        pricePerUnit++;
      }

      return totalAmount;
    }
  }
}
