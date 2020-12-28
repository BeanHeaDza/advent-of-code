import { countBy, max } from "lodash";
import { columnToRow, readInput } from "../../common";

function getMax(line: string) {
  const counts = countBy(line.split(""));
  const maxCount = max(Object.values(counts));
  return Object.keys(counts).find((k) => counts[k] === maxCount);
}

function main() {
  const input = readInput();
  return columnToRow(input).map(getMax).join("");
}

console.log(main());
