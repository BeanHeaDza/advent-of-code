import { groupBy, sum } from "lodash";
import { createGrid, readInput } from "../../common";

interface Orientation {
  n: string;
  e: string;
  s: string;
  w: string;
  text: string;
}

interface Tile {
  id: number;
  orientations: Orientation[];
}

type PlacedTile = { id: number; orientation: Orientation };

const MONSTER = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   ",
];

function sRev(str: string) {
  return str.split("").reverse().join("");
}

function rotate(lines: string[]): string[] {
  let newLines: string[] = [];
  for (let y = 0; y < lines[0].length; y++) {
    newLines.push("");
    for (let x = 0; x < lines.length; x++) {
      newLines[y] += lines[lines.length - x - 1][y];
    }
  }
  return newLines;
}

function flipHorizontal(lines: string[]) {
  return lines.reverse();
}

function flipVertical(lines: string[]) {
  return lines.map(sRev);
}

function getEdges(lines: string[]) {
  let e = "";
  let w = "";

  for (const line of lines) {
    w += line[0];
    e += line[line.length - 1];
  }

  return { n: lines[0], e, s: lines[lines.length - 1], w };
}

function getOrientations(lines: string[], skipEdges: true): string[];
function getOrientations(lines: string[], skipEdges: false): Orientation[];
function getOrientations(
  lines: string[],
  skipEdges = false
): Orientation[] | string[] {
  const orientations = new Set<string>();

  orientations.add(lines.join("\n"));
  let o = lines;
  for (let x = 0; x < 3; x++) {
    o = rotate(o);
    orientations.add(o.join("\n"));
  }

  o = flipHorizontal(lines);
  orientations.add(o.join("\n"));
  for (let x = 0; x < 3; x++) {
    o = rotate(o);
    orientations.add(o.join("\n"));
  }

  o = flipVertical(lines);
  orientations.add(o.join("\n"));
  for (let x = 0; x < 3; x++) {
    o = rotate(o);
    orientations.add(o.join("\n"));
  }

  o = flipHorizontal(flipVertical(lines));
  orientations.add(o.join("\n"));
  for (let x = 0; x < 3; x++) {
    o = rotate(o);
    orientations.add(o.join("\n"));
  }

  if (skipEdges) {
    return [...orientations];
  }

  return [...orientations].map<Orientation>((text) => ({
    ...getEdges(text.split("\n")),
    text,
  }));
}

function parseTiles(input: string[]) {
  input.push("");
  let id = 0;

  const tiles: Tile[] = [];

  let lines: string[] = [];
  for (const line of input) {
    if (line.startsWith("Tile")) {
      id = +line.replace(/.*?(\d+).*/, "$1");
    } else if (line) {
      lines.push(line);
    } else {
      tiles.push({ id: id, orientations: getOrientations(lines, false) });
      lines = [];
    }
  }

  return tiles;
}

function getSides(tiles: Tile[]) {
  const sides = new Map<string, number[]>();

  const addMatch = (side: string, id: number) => {
    let group = sides.get(side) || [];
    if (!group.includes(id)) {
      group.push(id);
    }
    sides.set(side, group);
  };

  for (const tile of tiles) {
    for (const or of tile.orientations) {
      addMatch(or.n, tile.id);
    }
  }
  return sides;
}

function getCornerPieces(tiles: Tile[]) {
  const sides = getSides(tiles);
  const edgeIds = [];

  for (const ids of sides.values()) {
    if (ids.length === 1) {
      edgeIds.push(ids[0]);
    }
  }

  const grouped = groupBy(edgeIds);

  const cornerIds: number[] = [];
  for (const key of Object.keys(grouped)) {
    if (grouped[key].length === 4) {
      cornerIds.push(+key);
    }
  }

  return cornerIds;
}

function isCornerTile(size: number, x: number, y: number) {
  let sideCount = 0;
  sideCount += x === 0 ? 1 : 0;
  sideCount += x === size - 1 ? 1 : 0;
  sideCount += y === 0 ? 1 : 0;
  sideCount += y === size - 1 ? 1 : 0;

  return sideCount === 2;
}

function* validTiles(
  topSide: string,
  leftSide: string,
  tiles: Tile[]
): Generator<PlacedTile> {
  for (const tile of tiles) {
    for (const o of tile.orientations) {
      if ((!topSide || o.n === topSide) && (!leftSide || o.w === leftSide)) {
        yield { id: tile.id, orientation: o };
      }
    }
  }
}

function getNextXY(x: number, y: number, size: number) {
  let sum = x-- + y++;
  if (x < 0 || y >= size) {
    x = ++sum >= size ? size - 1 : sum;
    y = sum - x;
  }

  return [x, y];
}

function pickBlocks(
  grid: PlacedTile[][],
  tiles: Tile[],
  cornerIds: number[],
  x = 0,
  y = 0
): boolean {
  if (y >= grid.length || x >= grid.length) {
    return true;
  }

  const isCorner = isCornerTile(grid.length, x, y);

  const topSide = y === 0 ? null : grid[y - 1][x].orientation.s;
  const leftSide = x === 0 ? null : grid[y][x - 1].orientation.e;

  const localTiles = tiles.filter((t) => !isCorner || cornerIds.includes(t.id));

  for (const tile of validTiles(topSide, leftSide, localTiles)) {
    if (x === 0 && y === 0 && tile.id !== cornerIds[0]) {
      continue;
    }
    grid[y][x] = tile;
    const [nX, nY] = getNextXY(x, y, grid.length);
    if (
      pickBlocks(
        grid,
        tiles.filter((t) => t.id !== tile.id),
        cornerIds,
        nX,
        nY
      )
    ) {
      return true;
    }
  }
}

function main() {
  const input = readInput();
  const tiles = parseTiles(input);
  const cubeSize = Math.sqrt(tiles.length);
  const gridInit = () => ({ id: 0, orientation: null });
  let grid: PlacedTile[][] = createGrid(gridInit, cubeSize, cubeSize);

  const cornerIds = getCornerPieces(tiles);

  if (!pickBlocks(grid, tiles, cornerIds)) {
    throw new Error();
  }

  const tileSize = tiles[0].orientations[0].text.split("\n").length - 2;
  const image: string[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const lines = grid[y][x].orientation.text.split("\n");
      for (let z = 1; z <= tileSize; z++) {
        const iY = y * tileSize + z - 1;
        if (!image[iY]) image[iY] = "";
        image[iY] += lines[z].replace(/^.(.*).$/, "$1");
      }
    }
  }

  const imageArr = image.map((s) => s.split(""));
  let monsterOrientations = getOrientations(MONSTER, true);

  for (const monster of monsterOrientations.map((m) => m.split("\n"))) {
    for (let y = 0; y < imageArr.length - monster.length + 1; y++) {
      for (let x = 0; x < imageArr[y].length - monster[0].length + 1; x++) {
        let found = true;
        for (let mY = 0; mY < monster.length; mY++) {
          for (let mX = 0; mX < monster[mY].length; mX++) {
            if (monster[mY][mX] === "#" && imageArr[y + mY][x + mX] === ".") {
              found = false;
              break;
            }
          }
          if (!found) {
            break;
          }
        }

        if (found) {
          for (let mY = 0; mY < monster.length; mY++) {
            for (let mX = 0; mX < monster[mY].length; mX++) {
              if (monster[mY][mX] === "#") {
                imageArr[y + mY][x + mX] = "O";
              }
            }
            if (!found) {
              break;
            }
          }
        }
      }
    }
  }

  return sum(imageArr.map((line) => line.filter((c) => c === "#").length));
}

console.log(main());
