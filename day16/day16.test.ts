import {
  input,
  test1,
  test2,
  test3,
  test1HexToDecimal,
  test2HexToDecimal,
  test3HexToDecimal,
  example1,
  example2,
  example3,
  example4,
} from './fixtures';
import { Player } from '../src';
import { Computer } from '../src/Computer/Computer';

describe('hex 2 decimal', () => {
  it.each([
    [test1, test1HexToDecimal],
    [test2, test2HexToDecimal],
    [test3, test3HexToDecimal],
  ])('convert %s to decimal', (input, HexToDecimal) => {
    const computer = new Computer({ input });
    const { binaryTransmission } = computer;
    expect(binaryTransmission).toBe(HexToDecimal);
  });
});

describe('header', () => {
  describe('packet version', () => {
    it.each([
      [test1, 6],
      [test2, 1],
      [test3, 7],
    ])('%s ', (input, expectedPacketVersion) => {
      const computer = new Computer({ input });
      const { mainPacketVersion } = computer;
      expect(mainPacketVersion).toBe(expectedPacketVersion);
    });
  });

  describe('type id', () => {
    it.each([
      [test1, 4],
      [test2, 6],
      [test3, 3],
    ])('%s', (input, expectetTypeId) => {
      const computer = new Computer({ input });
      const { mainTypeId } = computer;
      expect(mainTypeId).toBe(expectetTypeId);
    });
  });
});

describe('payload', () => {
  it.each([
    [test1, 2021],
    // [test2, 6],
  ])('%s - literal value', (input, expectedAnswer) => {
    const computer = new Computer({ input });
    const { mainValue } = computer;
    expect(mainValue).toBe(expectedAnswer);
  });

  it.each([
    [test1, null],
    [test2, 0],
    [test3, 1],
  ])('%s - length type', (input, expectedAnswer) => {
    const computer = new Computer({ input });
    const { mainLengthTypeId } = computer;
    expect(mainLengthTypeId).toBe(expectedAnswer);
  });

  it.each([
    [test1, null, null],
    [test2, '000000000011011', 27],
    [test3, null, null],
  ])(
    '%s - bit length of subpackets',
    (input, expectedBits, expectedNumber) => {
      const computer = new Computer({ input });
      const {
        mainBitLengthOfSubpackets: { bits, number },
      } = computer;
      expect(bits).toBe(expectedBits);
      expect(number).toBe(expectedNumber);
    },
  );

  it.each([
    [test1, null, null],
    [test2, null, null],
    [test3, '00000000011', 3],
  ])(
    '%s - num of subsequent subpackets',
    (input, expectedBits, expectedNumber) => {
      const computer = new Computer({ input });
      const {
        mainNumberOfImmediatelyContainedSubpackets: {
          bits,
          number,
        },
      } = computer;
      expect(bits).toBe(expectedBits);
      expect(number).toBe(expectedNumber);
    },
  );

  it.each([
    [test1, null, null],
    [test2, '000000000011011', 27],
    [test3, null, null],
  ])(
    '%s - this one was for splitting type 0 lengths things',
    (input, expectedBits, expectedNumber) => {
      const computer = new Computer({ input });
      const {
        mainBitLengthOfSubpackets: { bits, number },
      } = computer;
      expect(bits).toBe(expectedBits);
      expect(number).toBe(expectedNumber);
    },
  );

  it.each([
    // [test1, null, null],
    // [test2, null, null],
    [test3, '00000000011', 3],
  ])(
    '%s - for splitting type 1 length thigns',
    (input, expectedBits, expectedNumber) => {
      const computer = new Computer({ input });
      const {
        mainNumberOfImmediatelyContainedSubpackets: {
          bits,
          number,
        },
      } = computer;
      expect(bits).toBe(expectedBits);
      expect(number).toBe(expectedNumber);
    },
  );

  it.only.each([
    // [example1, 16],
    [example2, 12],
    // [example3, '00000000011'],
  ])(
    '%s - for splitting type 1 length thigns',
    (input, expected) => {
      const computer = new Computer({ input });
      const { totalVersionNumbers } = computer;
      expect(totalVersionNumbers).toBe(expected);
    },
  );
});

/*

011 000 1 00000 00001 0 
  000 000 0 00000 00000 10110 
    000 100 01010 
    101 100 01011
    
  001 000 1 00000 00001 0
    000 100 01100 
    011 100 01101 00

*/
