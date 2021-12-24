import { Computer } from './Computer';

export class Packet {
  constructor({ binary }) {
    console.log(
      binary,
      `
    -
    -
    -
    -
    -
    
    new packetttt

    -
    -
    -
    -
    -
    -
    
    `,
    );
    this.binary = binary;
    this.packetVersion = this.setPacketVersion();
    this.typeId = this.setTypeId();
    this.collectSubpackets();
  }
  binary;
  typeIdValue;
  typeId;
  subpackets = [];
  packetVersion;

  setTypeId() {
    const typeId = this.binary.slice(3, 6);
    const num = this.numFromBinary(typeId);
    console.log('setting type id', typeId, ' - ', Number(num));
    return Number(num);
  }

  collectSubpackets() {
    console.log('collecting subpackets');
    if (this.typeId == 4) {
      console.log('---is a literal');
      return null;
    }

    // console.log('-is operator-', {
    //   p: this.packetVersion,
    //   t: this.typeId,
    //   L: this.lengthTypeId,
    // });

    if (this.lengthTypeId == 0) {
      // console.log('0');
      const { number: bitLengthOfSubpackets } = this.bitLengthOfSubpackets;
      const subpacketsBits = this.binary.slice(22, 22 + bitLengthOfSubpackets);
      this.identifyPackets({
        binary: subpacketsBits,
        bitLength: bitLengthOfSubpackets,
      });
    }

    if (this.lengthTypeId == 1) {
      // console.log('1');
      const { number: subpackCount } =
        this.numberOfImmediatelyContainedSubpackets;
      const totalSubpackBinary = this.binary.slice(18);
      this.identifyPackets({
        binary: totalSubpackBinary,
        count: subpackCount,
      });
    }
  }

  identifyPackets({ binary, count = null, bitLength = null }) {
    let beginningIndex = 0;
    let packetVersion = null;
    let packetTypeId = null;
    let lengthTypeId = null;
    let subpacketCount = null;
    let lengthOfSubpacketsInBits = null;
    let firstGroupId = null;

    if (count) {
      console.log('using count', {
        binary,
        count,
        // bitLength,
        // beginningIndex,
      });

      let remaining = count;

      if (count == 1) {
        console.log('ONE');
        // console.log('making new subpacket count 1');
        if (binary.length > 0) {
          this.subpackets.push(new Packet({ binary }));
        }
        // console.log(1, this.subpackets);
        return;
      }

      console.log('more than one', binary);

      for (let i = 0, step = 3; i <= binary.length; i += step) {
        // console.log({ i }, binary.slice(i, i + 3));

        // console.log({
        //   lengthOfSubpacketsInBits,
        //   subpacketCount,
        // });

        if (packetTypeId == 4 && firstGroupId == '0') {
          let newPacketBinary = binary.slice(beginningIndex, i);

          // console.log('making new subpacket', newPacketBinary);
          if (newPacketBinary.length > 0) {
            this.subpackets.push(new Packet({ binary: newPacketBinary }));
          }
          console.log(this.subpackets.length);

          packetVersion = null;
          packetTypeId = null;
          lengthTypeId = null;
          lengthOfSubpacketsInBits = null;
          firstGroupId = null;
          beginningIndex = i;
          step = 3;
        }

        if (lengthOfSubpacketsInBits !== null || subpacketCount !== null) {
          // console.log({ lengthOfSubpacketsInBits, subpacketCount });
          let newPacketBinary;
          if (lengthOfSubpacketsInBits !== null) {
            newPacketBinary = binary.slice(
              beginningIndex,
              i + 15 + lengthOfSubpacketsInBits,
            );
          }

          let newBeginning = i + 15 + lengthOfSubpacketsInBits;

          if (newPacketBinary.length > 0) {
            this.subpackets.push(new Packet({ binary: newPacketBinary }));
          }

          packetVersion = null;
          packetTypeId = null;
          lengthTypeId = null;
          lengthOfSubpacketsInBits = null;
          subpacketCount = null;
          firstGroupId = null;
          beginningIndex = newBeginning;
          step = 3;
        }

        packetTypeId =
          packetTypeId === null && packetVersion != null
            ? this.numFromBinary(binary.slice(i, i + 3))
            : packetTypeId;

        packetVersion =
          packetVersion === null
            ? this.numFromBinary(binary.slice(i, i + 3))
            : packetVersion;

        // console.log({ packetVersion, packetTypeId });

        if (packetTypeId !== null && packetVersion !== null) {
          if (packetTypeId == 4) {
            if (firstGroupId == null) {
              i = i + 3;
            }
            firstGroupId = binary[i];
            step = 5;
          } else {
            if (lengthTypeId == null) {
              i = i + 3;
              lengthTypeId = Number(binary[i]);
              i++;
            }

            if (lengthOfSubpacketsInBits == null && lengthTypeId === 0) {
              lengthOfSubpacketsInBits = parseInt(binary.slice(i, i + 15), 2);
              step = 0;

              // console.log({
              //   i,
              //   lengthTypeId,
              //   packetTypeId,
              //   lengthOfSubpacketsInBits,
              // });
            }
          }
        }
      }
    }

    // 101000000000000101101100100010000000000101100010000000010111110000110110100001101011000110001010001111010100011110000000

    if (bitLength) {
      console.log('using bitlength', {
        binary,
        // count,
        // bitLength,
      });

      for (let i = 0, step = 3; i <= binary.length; i += step) {
        if (packetTypeId == 4 && firstGroupId == '0') {
          let newPacketBinary = binary.slice(beginningIndex, i);

          // console.log('making new subpacket', newPacketBinary);
          if (newPacketBinary.length > 0) {
            // here somewhere
            console.log('here somewhere', newPacketBinary);
            // this.subpackets.push(new Packet({ binary: newPacketBinary }));
          }

          packetVersion = null;
          packetTypeId = null;
          lengthTypeId = null;
          lengthOfSubpacketsInBits = null;
          firstGroupId = null;
          beginningIndex = i;
          step = 3;
        }

        if (lengthOfSubpacketsInBits !== null || subpacketCount !== null) {
          // console.log({ lengthOfSubpacketsInBits, subpacketCount });
          let newPacketBinary;
          if (lengthOfSubpacketsInBits !== null) {
            newPacketBinary = binary.slice(
              beginningIndex,
              i + 15 + lengthOfSubpacketsInBits,
            );
          }

          let newBeginning = i + 15 + lengthOfSubpacketsInBits;

          // console.log({ l: newPacketBinary.length });
          // console.log('making new subpacket count+', newPacketBinary);
          if (newPacketBinary.length > 0) {
            this.subpackets.push(new Packet({ binary: newPacketBinary }));
          }

          packetVersion = null;
          packetTypeId = null;
          lengthTypeId = null;
          lengthOfSubpacketsInBits = null;
          firstGroupId = null;
          subpacketCount = null;
          beginningIndex = newBeginning;
          step = 3;
        }

        packetTypeId =
          packetTypeId == null && packetVersion != null
            ? this.numFromBinary(binary.slice(i, i + 3))
            : packetTypeId;

        packetVersion =
          packetVersion == null
            ? this.numFromBinary(binary.slice(i, i + 3))
            : packetVersion;

        if (packetTypeId != null && packetVersion != null) {
          // console.log({ i, packetVersion, packetTypeId });
          if (packetTypeId == 4) {
            if (firstGroupId == null) {
              i = i + 3;
            }
            firstGroupId = binary[i];
            // console.log({ firstGroupId });
            step = 5;
          } else {
            if (lengthTypeId == null) {
              i = i + 3;

              lengthTypeId = Number(binary[i]);
              // console.log({
              //   packetTypeId,
              //   packetVersion,
              //   i,
              //   binary,
              //   lengthTypeId,
              // });
              i++;
            }

            if (lengthOfSubpacketsInBits == null && lengthTypeId === 0) {
              lengthOfSubpacketsInBits = parseInt(binary.slice(i, i + 15), 2);
              step = 0;
            }

            if (lengthTypeId === 1) {
              // console.log({ lengthTypeId });

              // console.log({ binary });
              let subpacketsBinary = binary.slice(18);
              // console.log({ subpacketsBinary });
              // this.subpackets.push(new Packet({ binary: subpacketsBinary }));

              packetVersion = null;
              packetTypeId = null;
              lengthTypeId = null;
              lengthOfSubpacketsInBits = null;
              firstGroupId = null;
              subpacketCount = null;
            }

            // console.log({ lengthTypeId, packetTypeId });
          }
        }
      }

      // console.log('done bitlength');
    }
    console.log('end', { binary, count, bitLength });
  }

  get bitLengthOfSubpackets() {
    let bits = null;
    let number = null;

    if (this.typeId == 4 || this.lengthTypeId == 1) {
      return { bits, number };
    }

    const bitLengthOfSubpackets = this.binary.slice(7, 22);

    return {
      bits: bitLengthOfSubpackets,
      number: parseInt(bitLengthOfSubpackets, 2),
    };
  }

  get numberOfImmediatelyContainedSubpackets() {
    let bits = null;
    let number = null;

    if (this.typeId == 4 || this.lengthTypeId == 0) {
      return { bits, number };
    }

    const numberOfSubpackets = this.binary.slice(7, 18);

    return {
      bits: numberOfSubpackets,
      number: parseInt(numberOfSubpackets, 2),
    };
  }

  get totalVersionNumbers() {
    // console.log('getting total versions - packet');
    // console.log(this);
    let versionNumberCount = this.subpackets.reduce((acc, subpacket) => {
      // console.log({ v: subpacket.packetVersion });
      return acc + subpacket.packetVersion + subpacket.totalVersionNumbers;
    }, 0);

    return versionNumberCount;
  }

  setPacketVersion() {
    const packetBinary = this.binary.slice(0, 3);
    const num = this.numFromBinary(packetBinary);
    console.log('setting packet version', packetBinary, ' - ', Number(num));
    Computer.packetsVersions.push([num, packetBinary]);
    return Number(num);
  }

  get literalValue() {
    // console.log('getting value', this.typeId);
    if (this.typeId == 4) {
      return this.countLiteralValues();
    }
    return 0;
  }

  countLiteralValues() {
    let binaryValue = this.binary.slice(6);
    let bitGroups = [];
    let continueChecking = true;

    while (continueChecking) {
      const bitGroup = binaryValue.slice(0, 5);
      bitGroups.push(bitGroup);
      let binaryValueArray = binaryValue.split('');
      binaryValueArray.splice(0, 5);
      binaryValue = binaryValueArray.join('');
      if (bitGroup[0] == '0') {
        continueChecking = false;
      }
    }

    const number = bitGroups
      .map((group) => {
        const bit = group.slice(1, 5);
        return bit;
      })
      .join('');

    return parseInt(number, 2);
  }

  get lengthTypeId() {
    if (this.typeId == 4) {
      return null;
    }

    const lengthTypeId = this.binary.slice(6, 7);
    return Number(lengthTypeId);
  }

  numFromBinary(binary) {
    let newBinary = binary;

    while (newBinary.length < 4) {
      const thing = newBinary.split('');
      thing.splice(0, 0, '0');
      newBinary = thing.join('');
    }

    const [[number]] = Object.entries(Computer.hexToBinaryMap).filter(
      (item) => item[1] == newBinary,
    );

    return Number(number);
  }
}
