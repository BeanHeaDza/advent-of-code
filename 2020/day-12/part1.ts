import { readInput } from "../../common";

enum Bearing {
  North,
  East,
  South,
  West,
}

function main() {
  const input = readInput();

  let bearing = Bearing.East;
  let x = 0;
  let y = 0;

  for (const line of input) {
    const action = line[0];
    const num = +line.slice(1);

    switch (action) {
      case "N":
        y += num;
        break;
      case "S":
        y -= num;
        break;
      case "E":
        x += num;
        break;
      case "W":
        x -= num;
        break;
      case "L":
        bearing -= num / 90;
        bearing += 4;
        bearing %= 4;
        break;
      case "R":
        bearing += num / 90;
        bearing += 4;
        bearing %= 4;
        break;
      case "F":
        switch (bearing) {
          case Bearing.North:
            y += num;
            break;
          case Bearing.East:
            x += num;
            break;
          case Bearing.South:
            y -= num;
            break;
          case Bearing.West:
            x -= num;
            break;
          default:
            throw Error();
        }
        break;
      default:
        throw Error();
    }
  }

  return Math.abs(x) + Math.abs(y);
}

console.log(main());
