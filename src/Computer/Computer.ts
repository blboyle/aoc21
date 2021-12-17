import { Packet } from './Packet';

export class Computer {
  constructor({ input }) {
    this.transmission = input;
    this.convertTransmissionToBinary();
    console.log(this.binary.length, this.binary);
    this.main = new Packet({ binary: this.binary });
  }
  transmission;
  binary;

  main;

  get binaryTransmission() {
    return this.binary;
  }

  get mainPacketVersion() {
    return this.main.packetVersion;
  }

  get mainLengthTypeId() {
    return this.main.lengthTypeId;
  }

  get mainBitLengthOfSubpackets() {
    return this.main.bitLengthOfSubpackets;
  }

  get mainNumberOfImmediatelyContainedSubpackets() {
    return this.main.numberOfImmediatelyContainedSubpackets;
  }

  get mainTypeId() {
    return this.main.typeId;
  }

  get mainValue() {
    return this.main.literalValue;
  }

  get totalVersionNumbers() {
    console.log('getting total versions - main');
    return (
      this.main.totalVersionNumbers +
      this.main.packetVersion
    );
  }

  static hexToBinaryMap = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: 1000,
    9: 1001,
    A: 1010,
    B: 1011,
    C: 1100,
    D: 1101,
    E: 1110,
    F: 1111,
  };

  convertTransmissionToBinary() {
    this.binary = this.transmission
      .split('')
      .map((char) => {
        return Computer.convertHexToBinary(char);
      })
      .join('');
  }
  static convertHexToBinary(char) {
    return this.hexToBinaryMap[char];
  }
}
