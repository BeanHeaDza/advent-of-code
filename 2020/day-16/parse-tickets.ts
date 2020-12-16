import { readInput } from "../../common";

export interface IRange {
  name: string;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

export function parseTickets() {
  const input = readInput();
  const ranges: IRange[] = [];
  const tickets: number[][] = [];

  for (const line of input) {
    const rangeMatch = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/.exec(line);

    if (rangeMatch) {
      const name = rangeMatch[1];
      const [min1, max1, min2, max2] = rangeMatch.slice(2).map(Number);
      ranges.push({ name, min1, max1, min2, max2 });
    } else if (/^[\d,]+$/.test(line)) {
      tickets.push(line.split(",").map(Number));
    }
  }

  return { ranges, tickets };
}
