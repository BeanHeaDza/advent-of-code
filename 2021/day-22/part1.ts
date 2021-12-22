import { readInput } from "../../common";

function parse() {
  const result: {
    switchOn: boolean;
    xRange: number[];
    yRange: number[];
    zRange: number[];
  }[] = [];
  for (const line of readInput()) {
    const switchOn = line.startsWith("on");
    const coords = line
      .split(/[^\d-\.]+/)
      .filter((r) => r)
      .map((c) => c.split("..").map(Number));
    result.push({
      switchOn,
      xRange: coords[0],
      yRange: coords[1],
      zRange: coords[2],
    });
  }
  return result;
}

function main() {
  let on = new Set<string>();
  for (const { switchOn, xRange, yRange, zRange } of parse()) {
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      if (x < -50) {
        x = -51;
        continue;
      }
      if (x > 50) {
        break;
      }
      for (let y = yRange[0]; y <= yRange[1]; y++) {
        if (y < -50) {
          y = -51;
          continue;
        }
        if (y > 50) {
          break;
        }

        for (let z = zRange[0]; z <= zRange[1]; z++) {
          if (z < -50) {
            z = -51;
            continue;
          }
          if (z > 50) {
            break;
          }
          if (switchOn) {
            on.add(`${x},${y},${z}`);
          } else {
            on.delete(`${x},${y},${z}`);
          }
        }
      }
    }
  }
  return on.size;
}

console.log(main());
