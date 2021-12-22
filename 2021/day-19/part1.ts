import Big from "big.js";
import { readInput } from "../../common";

function arrAdd(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    throw new Error("Lengths must match");
  }
  const result: number[] = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i] + arr2[i]);
  }
  return result;
}

class Scanner {
  name: string;
  relativeBeacons: [number, number, number][] = [];
  relativeBeaconsSet = new Set<string>();
  rotations: [number, number, number][][] = [];
  beaconToLength = new Map<string, number>();
  lengthToBeacon = new Map<number, [number, number][]>();
  solved = false;

  constructor(lines: string[]) {
    this.name = lines[0];
    this.relativeBeacons;
    for (const [x, y, z] of lines
      .slice(1)
      .map((l) => l.split(",").map(Number))) {
      this.relativeBeacons.push([x, y, z]);
      this.relativeBeaconsSet.add([x, y, z].join(","));
    }
    for (let x = 0; x < this.relativeBeacons.length; x++) {
      const xMatrix = this.relativeBeacons[x];
      this.rotations.push(getRotations(xMatrix));
      for (let y = x + 1; y < this.relativeBeacons.length; y++) {
        const yMatrix = this.relativeBeacons[y];
        const length = Big(xMatrix[0])
          .minus(yMatrix[0])
          .pow(2)
          .add(Big(xMatrix[1]).minus(yMatrix[1]).pow(2))
          .add(Big(xMatrix[2]).minus(yMatrix[2]).pow(2))
          .sqrt()
          .toNumber();
        this.beaconToLength.set(`${x},${y}`, length);
        this.beaconToLength.set(`${y},${x}`, length);
        let arr = this.lengthToBeacon.get(length);
        arr || this.lengthToBeacon.set(length, (arr = []));
        arr.push([x, y], [y, x]);
      }
    }
  }

  overlaps(other: Scanner) {
    const failedDiffs = new Set<string>();
    for (let x = 0; x < this.relativeBeacons.length; x++) {
      const myX = this.relativeBeacons[x];
      for (let y = x + 1; y < this.relativeBeacons.length; y++) {
        const length = this.beaconToLength.get(`${x},${y}`);
        const myY = this.relativeBeacons[y];
        for (const [xx, yy] of other.lengthToBeacon.get(length) || []) {
          for (let r = 0; r < 24; r++) {
            const otherX = other.rotations[xx][r];
            const otherY = other.rotations[yy][r];
            const diff = [
              myX[0] - otherX[0],
              myX[1] - otherX[1],
              myX[2] - otherX[2],
            ];
            const diffId = diff.join(",");
            if (
              failedDiffs.has(diffId) ||
              myY[0] - diff[0] !== otherY[0] ||
              myY[1] - diff[1] !== otherY[1] ||
              myY[2] - diff[2] !== otherY[2]
            ) {
              continue;
            }
            let matches = 0;
            for (const otherBeacon of other.rotations) {
              const k = arrAdd(otherBeacon[r], diff).join(",");
              matches += this.relativeBeaconsSet.has(k) ? 1 : 0;
              if (matches >= 12) {
                other.solve(diff, r);
                return true;
              }
            }
            failedDiffs.add(diffId);
          }
        }
      }
    }
    return false;
  }

  solve(diff: number[], r: number) {
    this.relativeBeacons = this.rotations.map(
      (b) => arrAdd(b[r], diff) as [number, number, number]
    );
    this.relativeBeaconsSet = new Set(
      this.relativeBeacons.map((b) => b.join(","))
    );
    this.rotations = this.relativeBeacons.map((b) => getRotations(b));
    this.solved = true;
    // The lengths don't change
  }
}

// Facing
// x,y,z
// -x,y,-z
// -z,y,x
// z,y,-x
// -x,z,y
// x,z,-y

function getRotations([x, y, z]: number[]): [number, number, number][] {
  const result: [number, number, number][] = [];

  const addRotations = ([xx, yy, zz]: number[], reps = 3) => {
    result.push([xx, yy, zz]);
    if (reps-- === 0) {
      return;
    }
    addRotations([yy, -xx, zz], reps);
  };

  // x-axis
  addRotations([-z, y, x]);
  addRotations([z, y, -x]);

  // y-axis
  addRotations([-x, z, y]);
  addRotations([x, z, -y]);

  // z-axis
  addRotations([x, y, z]);
  addRotations([-x, y, -z]);

  return result;
}

function parse() {
  const input = readInput().join("\0");
  const scanners = input.split("\0\0");
  return scanners.map((s) => new Scanner(s.split("\0")));
}

function main() {
  const scanners = parse();
  scanners[0].solved = true;
  const solved = new Set([scanners[0]]);
  const unsolved = new Set(scanners.slice(1));
  const todo: Scanner[] = [scanners[0]];
  while (todo.length && unsolved.size) {
    const current = todo.pop();
    for (const other of unsolved) {
      if (current.overlaps(other)) {
        solved.add(other);
        unsolved.delete(other);
        todo.push(other);
      }
    }
  }

  const allBeacons = new Set(
    [...solved].flatMap((s) => [...s.relativeBeaconsSet])
  );

  return allBeacons.size;
}

console.log(main());
