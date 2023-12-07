import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  for (const line of input) {
    console.log({ line });
    const [gameId, x] = line.split(":");
    const pulls = x.split(";");
    for (const pull of pulls) {
      if (isValid(pull)) {
        console.log(gameId.slice(5));
        answer += +gameId.slice(5);
        break;
      }
    }
  }
  return answer;
}

console.log(main());

function isValid(pull: string): boolean {
  const parts = pull.trim().split(", ");
  for (const part of parts) {
    const [count, color] = part.split(" ");
    if (color == "red" && +count > 12) {
      return false;
    } else if (color == "green" && +count > 13) {
      return false;
    } else if (color == "blue" && +count > 14) {
      return false;
    }
  }
  return true;
}
