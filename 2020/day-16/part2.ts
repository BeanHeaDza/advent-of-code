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

function isValidTicket(ticket: number[], ranges: IRange[]) {
  for (const num of ticket) {
    let valid = false;
    for (const range of ranges) {
      valid = valid || isValid(range, num);
    }
    if (!valid) {
      return false;
    }
  }
  return true;
}

function getRemainingTickets(input: { ranges: IRange[]; tickets: number[][] }) {
  let remainingTickets: number[][] = [];

  for (const nearBy of input.tickets) {
    if (isValidTicket(nearBy, input.ranges)) {
      remainingTickets.push(nearBy);
    }
  }
  return remainingTickets;
}

function getOptions(ranges: IRange[], remainingTickets: number[][]) {
  const rangeLookup = new Map(ranges.map((r) => [r.name, r]));
  let options: string[][] = [];

  for (const _ of remainingTickets[0]) {
    options.push(ranges.map((r) => r.name));
  }

  for (let x = 0; x < options.length; x++) {
    for (const ticket of remainingTickets) {
      for (let y = 0; y < options[x].length; y++) {
        const element = options[x][y];
        if (!isValid(rangeLookup.get(element), ticket[x])) {
          options[x].splice(y, 1);
          y--;
        }
      }
    }
  }
  return options;
}

function getMappedOptions(options: string[][]) {
  const mappedOptions: { name: string; index: number }[] = [];
  while (mappedOptions.length < options.length) {
    const index = options.findIndex((arr) => arr.length === 1);
    if (index < 0) {
      throw new Error();
    }
    const name = options[index][0];

    for (const option of options) {
      const i = option.indexOf(name);
      if (i >= 0) {
        option.splice(i, 1);
      }
    }

    mappedOptions.push({ name, index });
  }

  return mappedOptions;
}

function main() {
  const input = parseTickets();
  let remainingTickets = getRemainingTickets(input);
  let options = getOptions(input.ranges, remainingTickets);
  const mappedOptions = getMappedOptions(options);

  let answer = 1;
  for (const x of mappedOptions.filter((o) => o.name.startsWith("departure"))) {
    answer *= input.tickets[0][x.index];
  }

  return answer;
}

console.log(main());
