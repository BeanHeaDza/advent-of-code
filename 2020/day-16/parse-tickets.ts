import { readInput } from "../../common";

export interface IRange {
  name: string;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

function parseRange(line: string): IRange {
  const [name, right] = line.split(":");

  const [first, second] = right.split(" or ");

  const [min1, max1] = first.split("-").map(Number);
  const [min2, max2] = second.split("-").map(Number);

  return { name, min1, max1, min2, max2 };
}

enum Step {
  ranges,
  myTicket,
  nearbyTickets,
}

export function parseTickets() {
  const input = readInput();

  const ranges: IRange[] = [];
  let myNumbers: number[];
  let nearbyNumbers: number[][] = [];

  let step = Step.ranges;

  for (const line of input) {
    if (line === "") {
      step++;
    }

    if (step === Step.ranges) {
      ranges.push(parseRange(line));
    } else if (step === Step.myTicket) {
      const numbers = line.split(",").map(Number);
      if (numbers.length > 1) {
        myNumbers = numbers;
      }
    } else {
      const numbers = line.split(",").map(Number);
      if (numbers.length > 1) {
        nearbyNumbers.push(numbers);
      }
    }
  }

  return { ranges, myNumbers, nearbyNumbers };
}
