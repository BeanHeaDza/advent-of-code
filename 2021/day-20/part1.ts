import { readInput } from "../../common";

function main() {
  const input = readInput();
  const lookup = input[0];
  const img = new Map<string, string>();
  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = input.length - 2;
  let defaultC = ".";
  for (let y = 0; y < input.length - 2; y++) {
    const row = input[y + 2];
    maxX = row.length;
    for (let x = 0; x < row.length; x++) {
      const c = row[x];
      img.set(`${x},${y}`, c);
    }
  }

  let enhanced = enhance({ lookup, img, minX, minY, maxX, maxY, defaultC });
  for (let n = 1; n < 2; n++) {
    enhanced = enhance({ ...enhanced, lookup });
  }
  return [...enhanced.img.values()].filter((c) => c === "#").length;
}

console.log(main());
function enhance({
  lookup,
  img,
  minX,
  minY,
  maxX,
  maxY,
  defaultC,
}: {
  lookup: string;
  img: Map<string, string>;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  defaultC: string;
}) {
  const result = new Map<string, string>();
  minX--;
  minY--;
  maxX++;
  maxY++;
  const val = (x: number, y: number) => {
    return (img.get(`${x},${y}`) || defaultC) === "#" ? "1" : "0";
  };

  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const bin =
        val(x - 1, y - 1) +
        val(x, y - 1) +
        val(x + 1, y - 1) +
        val(x - 1, y) +
        val(x, y) +
        val(x + 1, y) +
        val(x - 1, y + 1) +
        val(x, y + 1) +
        val(x + 1, y + 1);

      const i = parseInt(bin, 2);
      result.set(`${x},${y}`, lookup[i]);
    }
  }
  defaultC =
    lookup[
      parseInt(
        val(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY).repeat(9),
        2
      )
    ];
  img = result;
  return { img, minX, minY, maxX, maxY, defaultC };
}
