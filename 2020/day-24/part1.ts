import { countBy } from "lodash";
import { readInput } from "../../common";

function getTilePos(line: string) {
  let x = 0;
  let y = 0;

  while (line.length > 0) {
    if (line.startsWith("se")) {
      y--;
      x++;
      line = line.slice(2);
    } else if (line.startsWith("sw")) {
      y--;
      x--;
      line = line.slice(2);
    } else if (line.startsWith("nw")) {
      y++;
      x--;
      line = line.slice(2);
    } else if (line.startsWith("ne")) {
      y++;
      x++;
      line = line.slice(2);
    } else if (line.startsWith("e")) {
      x += 2;
      line = line.slice(1);
    } else if (line.startsWith("w")) {
      x -= 2;
      line = line.slice(1);
    }
  }

  return `${x},${y}`;
}

function main() {
  const input = readInput();
  const group = countBy(input.map(getTilePos));

  return Object.keys(group).filter((k) => group[k] % 2 === 1).length;
}

console.log(main());
