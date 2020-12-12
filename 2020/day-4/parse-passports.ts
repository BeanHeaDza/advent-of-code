import { readInput } from "../../common";

export function parsePassports(): { [key: string]: string }[] {
  const lines = readInput();
  const output: { [key: string]: string }[] = [];

  let current = {};

  for (const line of lines) {
    if (line === "") {
      output.push(current);
      current = {};
    } else {
      for (const pair of line.split(" ")) {
        const [key, value] = pair.split(":");
        current[key] = value;
      }
    }
  }

  if (Object.keys(current).length > 0) {
    output.push(current);
  }

  return output;
}
