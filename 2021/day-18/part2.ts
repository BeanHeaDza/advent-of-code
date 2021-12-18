import { readInput } from "../../common";
import { combinations } from "../../common/combinations-generator";

type SnailfishNumber = number | [SnailfishNumber, SnailfishNumber];

function main() {
  const input = readInput();
  let answer = 0;
  for (const [l, r] of combinations(input, 2, true, false)) {
    const num: SnailfishNumber = [JSON.parse(l), JSON.parse(r)];
    do {
      while (doExplode(num)) {}
    } while (doSplit(num));
    const mag = magnitude(num);
    answer = mag > answer ? mag : answer;
  }
  return answer;
}

console.log(main());
function doExplode(num: SnailfishNumber, level: number[] = []) {
  let parent: SnailfishNumber;
  let thisNum = num;
  for (let i = 0; i < level.length; i++) {
    parent = thisNum;
    thisNum = thisNum[level[i]];
  }
  if (typeof thisNum === "number") {
    return false;
  }
  const [left, right] = thisNum;

  if (level.length === 4) {
    if (typeof left !== "number" || typeof right !== "number") {
      throw new Error("What do?");
    }
    explodeLeft(num, level, left);
    explodeRight(num, level, right);
    parent[level[3]] = 0;
    return true;
  }

  if (doExplode(num, [...level, 0])) {
    return true;
  } else {
    return doExplode(num, [...level, 1]);
  }
}

function explodeLeft(num: SnailfishNumber, level: number[], value: number) {
  const iLast = level.lastIndexOf(1);
  if (iLast === -1) {
    return;
  }
  for (const i of level.slice(0, iLast)) {
    num = num[i];
  }
  if (typeof num[0] === "number") {
    num[0] += value;
  } else {
    num = num[0];
    while (typeof num[1] !== "number") {
      num = num[1];
    }
    num[1] += value;
  }
}
function explodeRight(num: SnailfishNumber, level: number[], value: number) {
  const iLast = level.lastIndexOf(0);
  if (iLast === -1) {
    return;
  }
  for (const i of level.slice(0, iLast)) {
    num = num[i];
  }
  if (typeof num[1] === "number") {
    num[1] += value;
  } else {
    num = num[1];
    while (typeof num[0] !== "number") {
      num = num[0];
    }
    num[0] += value;
  }
}
function doSplit(num: SnailfishNumber) {
  if (typeof num === "number") {
    return false;
  }

  const split = (i: number) => {
    const n = num[i];
    if (typeof n !== "number" || n <= 9) {
      return false;
    }
    const l = Math.floor(n / 2);
    const r = Math.ceil(n / 2);
    num[i] = [l, r];
    return true;
  };

  return split(0) || doSplit(num[0]) || split(1) || doSplit(num[1]);
}
function magnitude(num: [SnailfishNumber, SnailfishNumber]) {
  const l = typeof num[0] === "number" ? num[0] * 3 : magnitude(num[0]) * 3;
  const r = typeof num[1] === "number" ? num[1] * 2 : magnitude(num[1]) * 2;
  return l + r;
}
