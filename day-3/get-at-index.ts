import { readInput } from "../common";

export function getAtIndexFactory() {
  const lines = readInput();
  const width = lines[0].length;

  return function getAtIndex(x: number, y: number): string {
    if (y < 0 || y >= lines.length || x < 0) {
      return undefined;
    }

    x = x % width;
    return lines[y][x];
  };
}
