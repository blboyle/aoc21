import { input, test } from './fixtures';
import { Submarine } from '../src';

const sub = new Submarine();

describe('test input', () => {
  it('matches the test code for part 1', () => {
    sub.createDiagnosticReport(test);
    const { powerConsumption } = sub;
    expect(powerConsumption).toBe(198);
  });

  it('matches the test code for part 2', () => {
    sub.createDiagnosticReport(test);
    const { lifeSupportRating } = sub;
    expect(lifeSupportRating).toBe(230);
  });
});

describe('input', () => {
  it('matches the input code for part 1', () => {
    sub.createDiagnosticReport(input);
    const { powerConsumption } = sub;
    expect(powerConsumption).toBe(852500);
  });

  it('matches the input code for part 2', () => {
    sub.createDiagnosticReport(input);
    const { lifeSupportRating } = sub;
    expect(lifeSupportRating).toBe(1007985);
  });
});
