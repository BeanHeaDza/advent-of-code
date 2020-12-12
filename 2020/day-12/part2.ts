import { readInput } from "../../common";
enum Bearing {
  North,
  NE,
  East,
  SE,
  South,
  SW,
  West,
  NW,
}

function getBearing(x: number, y: number): Bearing {
  if (x === 0 && y > 0) return Bearing.North;
  if (x > 0 && y > 0) return Bearing.NE;
  if (x > 0 && y === 0) return Bearing.East;
  if (x > 0 && y < 0) return Bearing.SE;
  if (x === 0 && y < 0) return Bearing.South;
  if (x < 0 && y < 0) return Bearing.SW;
  if (x < 0 && y === 0) return Bearing.West;
  if (x < 0 && y > 0) return Bearing.NW;
}

function rotateBearing(x: number, y: number, degree: number): [number, number] {
  let newX, newY;
  if (degree < 0) {
    degree += 360;
  }
  while (degree > 0) {
    switch (getBearing(x, y)) {
      case Bearing.North:
        newX = y;
        newY = 0;
        break;
      case Bearing.NE:
        newX = y;
        newY = -x;
        break;
      case Bearing.East:
        newX = 0;
        newY = -x;
        break;
      case Bearing.SE:
        newX = y;
        newY = -x;
        break;
      case Bearing.South:
        newX = y;
        newY = 0;
        break;
      case Bearing.SW:
        newX = y;
        newY = -x;
        break;
      case Bearing.West:
        newX = 0;
        newY = -x;
        break;
      case Bearing.NW:
        newX = y;
        newY = -x;
        break;
      default:
        throw Error();
    }

    x = newX;
    y = newY;
    degree -= 90;
  }

  return [x, y];
}

function main() {
  const input = readInput();

  let x = 0;
  let y = 0;
  let wpX = 10;
  let wpY = 1;

  for (const line of input) {
    const action = line[0];
    const num = +line.slice(1);

    switch (action) {
      case "N":
        wpY += num;
        break;
      case "S":
        wpY -= num;
        break;
      case "E":
        wpX += num;
        break;
      case "W":
        wpX -= num;
        break;
      case "L":
        [wpX, wpY] = rotateBearing(wpX, wpY, -num);
        break;
      case "R":
        [wpX, wpY] = rotateBearing(wpX, wpY, num);
        break;
      case "F":
        x += wpX * num;
        y += wpY * num;
        break;
      default:
        throw Error();
    }
  }

  return Math.abs(x) + Math.abs(y);
}

console.log(main());

// . 0 . .
// . . . .
// . . x .
// . . . .

//  -+       ++

//  --       +-
