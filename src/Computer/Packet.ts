import { Computer } from './Computer';

export class Packet {
  constructor({ binary }) {
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
    return Number(num);
  }

  collectSubpackets() {
    console.log('collecting subpackets');
    if (this.typeId == 4) {
      return null;
    }

    if (this.lengthTypeId == 0) {
      console.log('0');
      const { number: bitLengthOfSubpackets } =
        this.bitLengthOfSubpackets;
      const subpacketsBits = this.binary.slice(
        22,
        22 + bitLengthOfSubpackets,
      );
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

  identifyPackets({
    binary,
    count = null,
    bitLength = null,
  }) {
    let beginningIndex = 0;
    let packetVersion = null;
    let packetTypeId = null;
    let lengthTypeId = null;
    let subpacketCount = null;
    let lengthOfSubpacketsInBits = null;
    let firstGroupId = null;

    if (count) {
      console.log('using count');
      console.log(binary.length, {
        binary,
        count,
        bitLength,
      });

      if (count == 1) {
        this.subpackets.push(new Packet({ binary }));
        console.log(1, this.subpackets);
        return;
      }

      for (
        let i = 0, step = 3;
        i <= binary.length;
        i += step
      ) {
        // console.log({ i }, binary.slice(i, i + 3));

        if (
          lengthOfSubpacketsInBits !== null ||
          subpacketCount !== null
        ) {
          let newPacketBinary;
          if (lengthOfSubpacketsInBits !== null) {
            newPacketBinary = binary.slice(
              beginningIndex,
              i + 15 + lengthOfSubpacketsInBits,
            );
          }

          if (subpacketCount !== null) {
            // newPacketBinary = binary.slice(
            //   beginningIndex,
            //   i + 15 + lengthOfSubpacketsInBits,
            // );
          }

          console.log({ l: newPacketBinary.length });
          this.subpackets.push(
            new Packet({ binary: newPacketBinary }),
          );

          packetVersion = null;
          packetTypeId = null;
          lengthTypeId = null;
          lengthOfSubpacketsInBits = null;
          firstGroupId = null;
          beginningIndex = i;
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

        if (
          packetTypeId !== null &&
          packetVersion !== null
        ) {
          if (packetTypeId == 4) {
            if (firstGroupId == null) {
              i = i + 3;
            }
            firstGroupId = binary[i];
            step = 5;
          } else {
            if (lengthTypeId == null) {
              i = i + 3;
              lengthTypeId = Number(binary[i + 1]);
              i++;
            }

            if (
              lengthOfSubpacketsInBits == null &&
              lengthTypeId === 0
            ) {
              lengthOfSubpacketsInBits = parseInt(
                binary.slice(i, i + 15),
                2,
              );
              step = 0;

              console.log({
                i,
                lengthTypeId,
                packetTypeId,
                lengthOfSubpacketsInBits,
              });
            }
          }
        }
      }
    }

    if (bitLength) {
      console.log('using bitLength');

      for (
        let i = 0, step = 3;
        i <= binary.length;
        i += step
      ) {
        if (packetTypeId == 4 && firstGroupId == '0') {
          let newPacketBinary = binary.slice(
            beginningIndex,
            i,
          );

          this.subpackets.push(
            new Packet({ binary: newPacketBinary }),
          );

          packetVersion = null;
          packetTypeId = null;
          lengthTypeId = null;
          lengthOfSubpacketsInBits = null;
          firstGroupId = null;
          beginningIndex = i;
          step = 3;
        }

        packetTypeId =
          !packetTypeId && packetVersion
            ? this.numFromBinary(binary.slice(i, i + 3))
            : packetTypeId;

        packetVersion = !packetVersion
          ? this.numFromBinary(binary.slice(i, i + 3))
          : packetVersion;

        if (packetTypeId && packetVersion) {
          if (packetTypeId == 4) {
            if (firstGroupId == null) {
              i = i + 3;
            }
            firstGroupId = binary[i];
            step = 5;
          } else {
            lengthTypeId = binary[i + 1];

            console.log({ lengthTypeId, packetTypeId });
          }
        }
      }
    }
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
    let versionNumberCount = this.subpackets.reduce(
      (acc, subpacket) => {
        // console.log({ v: subpacket.packetVersion });
        return (
          acc +
          subpacket.packetVersion +
          subpacket.totalVersionNumbers
        );
      },
      0,
    );

    return versionNumberCount;
  }

  setPacketVersion() {
    const packetBinary = this.binary.slice(0, 3);
    const num = this.numFromBinary(packetBinary);
    return Number(num);
  }

  get literalValue() {
    console.log('getting value', this.typeId);
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

    const [[number]] = Object.entries(
      Computer.hexToBinaryMap,
    ).filter((item) => item[1] == newBinary);

    return Number(number);
  }
}
