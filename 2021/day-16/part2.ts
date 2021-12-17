import { max, min, sum } from "lodash";
import { readInput } from "../../common";

const HEX_TO_BIN = new Map([
  ["0", "0000"],
  ["1", "0001"],
  ["2", "0010"],
  ["3", "0011"],
  ["4", "0100"],
  ["5", "0101"],
  ["6", "0110"],
  ["7", "0111"],
  ["8", "1000"],
  ["9", "1001"],
  ["A", "1010"],
  ["B", "1011"],
  ["C", "1100"],
  ["D", "1101"],
  ["E", "1110"],
  ["F", "1111"],
]);

type Packet = LiteralPacket | OperatorPacket;

interface LiteralPacket {
  version: number;
  typeId: 4;
  value: number;
  bitSize: number;
}

interface OperatorPacket {
  version: number;
  typeId: number;
  subPackets: Packet[];
  bitSize: number;
}

function toBin(s: string) {
  let output = "";
  for (const c of s) {
    output += HEX_TO_BIN.get(c);
  }
  return output;
}

function parse(bin: string, offset = 0): Packet {
  const startingOffset = offset;
  if (offset + 6 >= bin.length) {
    return undefined;
  }
  let version = parseInt(bin.substring(offset, (offset += 3)), 2);
  const typeId = parseInt(bin.substring(offset, (offset += 3)), 2);
  const lt = typeId === 4 ? undefined : bin.substring(offset, ++offset);
  if (typeId === 4) {
    let number = "";
    let next = "1";
    while (next === "1") {
      next = bin[offset++];
      number += bin.substring(offset, (offset += 4));
    }
    return {
      version,
      typeId,
      value: parseInt(number, 2),
      bitSize: offset - startingOffset,
    };
  } else if (lt === "0") {
    const l = parseInt(bin.substring(offset, (offset += 15)), 2);
    const targetOffset = offset + l;
    const subPackets: Packet[] = [];
    do {
      const nextPacket = parse(bin, offset);
      subPackets.push(nextPacket);
      offset += nextPacket.bitSize;
    } while (offset < targetOffset);
    return {
      version,
      typeId,
      bitSize: offset - startingOffset,
      subPackets,
    };
  } else if (lt === "1") {
    let packets = parseInt(bin.substring(offset, (offset += 11)), 2);
    const subPackets: Packet[] = [];
    while (packets-- > 0) {
      const nextPacket = parse(bin, offset);
      offset += nextPacket.bitSize;
      subPackets.push(nextPacket);
    }
    return {
      version,
      typeId,
      bitSize: offset - startingOffset,
      subPackets,
    };
  }
}

function evalPacket(packet: Packet): number {
  if ("value" in packet) {
    return packet.value;
  } else if ("subPackets" in packet) {
    const subPackets = packet.subPackets.map(evalPacket);
    if (packet.typeId === 0) {
      return sum(subPackets);
    } else if (packet.typeId === 1) {
      return subPackets.reduce((p, v) => p * v, 1);
    } else if (packet.typeId === 2) {
      return min(subPackets);
    } else if (packet.typeId === 3) {
      return max(subPackets);
    } else if (packet.typeId === 5) {
      return subPackets[0] > subPackets[1] ? 1 : 0;
    } else if (packet.typeId === 6) {
      return subPackets[0] < subPackets[1] ? 1 : 0;
    } else if (packet.typeId === 7) {
      return subPackets[0] === subPackets[1] ? 1 : 0;
    }
  }
}

function main() {
  const input = readInput()[0];
  let bin = toBin(input);

  return evalPacket(parse(bin));
}

console.log(main());
