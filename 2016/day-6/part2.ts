import { countBy, min } from "lodash";
import { columnToRow, readInput } from "../../common";

function getMax(line: string) {
  const counts = countBy(line.split(""));
  const minCount = min(Object.values(counts));
  return Object.keys(counts).find((k) => counts[k] === minCount);
}

function main() {
  const input = readInput();
  return columnToRow(input).map(getMax).join("");
}

console.log(main());
