import { max, min, sum } from "lodash";
import { readInput } from "../../common";
import { combinations } from "../../common/combinations-generator";

const combos = [...combinations([-1, 0, 1], 3, true, true)].filter((arr) =>
  arr.some((v) => v !== 0)
);

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

class OnBlock {
  readonly minX: number;
  readonly maxX: number;
  readonly minY: number;
  readonly maxY: number;
  readonly minZ: number;
  readonly maxZ: number;
  constructor(dim: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
  }) {
    this.minX = dim.minX;
    this.maxX = dim.maxX;
    this.minY = dim.minY;
    this.maxY = dim.maxY;
    this.minZ = dim.minZ;
    this.maxZ = dim.maxZ;
  }

  public get area(): number {
    return (
      (this.maxX - this.minX + 1) *
      (this.maxY - this.minY + 1) *
      (this.maxZ - this.minZ + 1)
    );
  }

  intersects(other: OnBlock) {
    return (
      this.minX <= other.maxX &&
      this.maxX >= other.minX &&
      this.minY <= other.maxY &&
      this.maxY >= other.minY &&
      this.minZ <= other.maxZ &&
      this.maxZ >= other.minZ
    );
  }
  splitOther(other: OnBlock) {
    const collisionBox = new OnBlock({
      minX: max([this.minX, other.minX]),
      maxX: min([this.maxX, other.maxX]),
      minY: max([this.minY, other.minY]),
      maxY: min([this.maxY, other.maxY]),
      minZ: max([this.minZ, other.minZ]),
      maxZ: min([this.maxZ, other.maxZ]),
    });
    const solve = (index: number, axis: "X" | "Y" | "Z", isMin: boolean) => {
      const otherMin = other["min" + axis];
      const otherMax = other["max" + axis];
      const colMin = collisionBox["min" + axis];
      const colMax = collisionBox["max" + axis];
      let value: number;
      if (isMin) {
        value = index < 0 ? otherMin : index > 0 ? colMax + 1 : colMin;
      } else {
        value = index < 0 ? colMin - 1 : index > 0 ? otherMax : colMax;
      }
      return clamp(value, otherMin - 1, otherMax + 1);
    };
    const newBlocks: OnBlock[] = [];
    for (const [x, y, z] of combos) {
      const block = new OnBlock({
        minX: solve(x, "X", true),
        maxX: solve(x, "X", false),
        minY: solve(y, "Y", true),
        maxY: solve(y, "Y", false),
        minZ: solve(z, "Z", true),
        maxZ: solve(z, "Z", false),
      });
      newBlocks.push(block);
    }
    return newBlocks.filter((b) => b.area);
  }
}

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
  const onBlocks = new Set<OnBlock>();
  for (const { switchOn, xRange, yRange, zRange } of parse()) {
    const block = new OnBlock({
      minX: xRange[0],
      maxX: xRange[1],
      minY: yRange[0],
      maxY: yRange[1],
      minZ: zRange[0],
      maxZ: zRange[1],
    });
    for (const otherBlock of [...onBlocks]) {
      if (block.intersects(otherBlock)) {
        onBlocks.delete(otherBlock);
        const newBlocks = block.splitOther(otherBlock);
        newBlocks.forEach((b) => onBlocks.add(b));
      }
    }
    if (switchOn) {
      onBlocks.add(block);
    }
  }
  return sum([...onBlocks].map((b) => b.area));
}

console.log(main());
