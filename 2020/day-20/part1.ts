import { groupBy } from "lodash";
import { readInput } from "../../common";

interface Orientation {
  n: string;
  e: string;
  s: string;
  w: string;
}

interface Tile {
  id: number;
  orientations: Orientation[];
}

function sRev(str: string) {
  return str.split("").reverse().join("");
}

function rotate({ n, e, s, w }: Orientation): Orientation {
  return { n: w, e: n, s: e, w: s };
}

function getOrientations(orientation: Orientation) {
  let w = Object.assign({}, orientation);

  const orientations: Orientation[] = [];
  orientations.push(orientation);
  for (let x = 0; x < 3; x++) {
    w = rotate(w);
    orientations.push(w);
  }

  w = {
    n: orientation.s,
    e: sRev(orientation.e),
    s: orientation.n,
    w: sRev(orientation.w),
  };
  orientations.push(orientation);
  for (let x = 0; x < 3; x++) {
    w = rotate(w);
    orientations.push(w);
  }

  w = {
    n: sRev(orientation.n),
    e: orientation.w,
    s: sRev(orientation.s),
    w: orientation.e,
  };
  orientations.push(orientation);
  for (let x = 0; x < 3; x++) {
    w = rotate(w);
    orientations.push(w);
  }

  w = {
    n: sRev(orientation.n),
    e: orientation.w,
    s: sRev(orientation.s),
    w: orientation.e,
  };
  w = { n: w.s, e: sRev(w.e), s: w.n, w: sRev(w.w) };
  orientations.push(orientation);
  for (let x = 0; x < 3; x++) {
    w = rotate(w);
    orientations.push(w);
  }

  const flat = new Set(
    orientations.map(({ n, s, e, w }) => `${n},${e},${s},${w}`)
  );

  return [...flat]
    .map((s) => s.split(","))
    .map(([n, e, s, w]) => ({ n, e, s, w }));
}

function parseTiles(input: string[]) {
  let id = 0;
  let n = "";
  let s = "";
  let e = "";
  let w = "";

  const tiles: Tile[] = [];

  let prev = "";
  for (const line of input) {
    if (line.startsWith("Tile")) {
      id = +line.replace(/.*?(\d+).*/, "$1");
    } else if (line) {
      if (!n) {
        n = line;
      }
      w += line[0];
      e += line[line.length - 1];
    } else {
      s = prev;

      tiles.push({ id: id, orientations: getOrientations({ n, e, s, w }) });
      n = "";
      s = "";
      e = "";
      w = "";
    }
    prev = line;
  }
  tiles.push({ id: id, orientations: getOrientations({ n, e, s, w }) });

  return tiles;
}

function main() {
  const input = readInput();
  const tiles = parseTiles(input);

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

  const sideIds = [];

  for (const ids of sides.values()) {
    if (ids.length === 1) {
      sideIds.push(ids[0]);
    }
  }

  const grouped = groupBy(sideIds);

  let answer = 1;
  for (const key of Object.keys(grouped)) {
    if (grouped[key].length === 4) {
      answer *= +key;
    }
  }
  return answer;
}

console.log(main());
