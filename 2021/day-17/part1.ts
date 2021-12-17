import { readInput } from "../../common";

function parse(input: string) {
  const [x, y] = input.split(", ");
  const [, xRange] = x.split("x=");
  const [, yRange] = y.split("y=");
  const [minX, maxX] = xRange.split("..").map(Number);
  const [minY, maxY] = yRange.split("..").map(Number);
  return { minX, maxX, minY, maxY };
}

function fire(
  x: number,
  y: number,
  { minX, minY, maxX, maxY }: ReturnType<typeof parse>
) {
  let posX = 0;
  let posY = 0;
  let maxPosY = 0;

  while (posY >= minY || y > 0) {
    posX += x;
    posY += y;
    x += x === 0 ? 0 : x > 0 ? -1 : 1;
    y--;
    if (y === 0) {
      maxPosY = posY;
    }

    if (posX >= minX && posX <= maxX && posY >= minY && posY <= maxY) {
      return maxPosY;
    }
  }
  return false;
}

function getPeakX(target: ReturnType<typeof parse>) {
  const xRange: number[] = [];
  let x = 1;
  let sum = 1;
  while (sum <= target.maxX) {
    sum += ++x;
    if (sum >= target.minX && sum <= target.maxX) {
      xRange.push(x);
    }
  }
  return xRange;
}

function main() {
  const input = readInput()[0];
  const target = parse(input);
  if (target.minX < 1) {
    throw new Error(
      "Solution will not work! Too lazy to add flip logic for hypotheticals"
    );
  }
  const peakXRange = getPeakX(target);
  let answer = 0;
  for (let i = 0; i < 10000; i++) {
    for (const xSpeed of peakXRange) {
      answer = fire(xSpeed, i, target) || answer;
    }
  }
  return answer;
}

console.log(main());
