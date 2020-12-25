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

function getNeighbors(pos: string) {
  const [x, y] = pos.split(",").map(Number);
  return [
    `${x + 2},${y}`, // e
    `${x + 1},${y - 1}`, // se
    `${x - 1},${y - 1}`, // sw
    `${x - 2},${y}`, // w
    `${x - 1},${y + 1}`, // nw
    `${x + 1},${y + 1}`, // ne
  ];
}

function day(blackTiles: Set<string>) {
  const newTiles = new Set<string>();
  const tilesToCheck = new Set<string>();

  for (const tile of blackTiles.values()) {
    tilesToCheck.add(tile);
    for (const neighbor of getNeighbors(tile)) {
      tilesToCheck.add(neighbor);
    }
  }

  for (const tile of tilesToCheck) {
    const isBlack = blackTiles.has(tile);
    const neighbors = getNeighbors(tile).filter((t) => blackTiles.has(t))
      .length;
    if (isBlack && neighbors > 0 && neighbors < 3) {
      newTiles.add(tile);
    } else if (!isBlack && neighbors === 2) {
      newTiles.add(tile);
    }
  }

  return newTiles;
}

function main() {
  const input = readInput();
  const group = countBy(input.map(getTilePos));
  let blackTiles = new Set(
    Object.keys(group).filter((k) => group[k] % 2 === 1)
  );

  for (let i = 0; i < 100; i++) {
    blackTiles = day(blackTiles);
  }

  return blackTiles.size;
}

console.log(main());
