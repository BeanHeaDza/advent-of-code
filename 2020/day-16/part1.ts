import { IRange, parseTickets } from "./parse-tickets";

function isValid(range: IRange, num: number) {
  if (num >= range.min1 && num <= range.max1) {
    return true;
  }
  if (num >= range.min2 && num <= range.max2) {
    return true;
  }

  return false;
}

function main() {
  const input = parseTickets();

  let invalidCount = 0;

  for (const nearby of input.tickets) {
    for (const num of nearby) {
      let valid = false;
      for (const range of input.ranges) {
        valid = valid || isValid(range, num);
      }
      if (!valid) {
        invalidCount += num;
      }
    }
  }

  return invalidCount;
}

console.log(main());
