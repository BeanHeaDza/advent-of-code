import { readInput } from "../../common";

function main() {
  const input = readInput();
  let answer = 0;
  for (const line of input) {
    const [gameId, x] = line.split(":");
    const pulls = x.split(";");
    var result = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const pull of pulls) {
      const p = power(pull);
      if (p.red > result.red) {
        result.red = p.red;
      }
      if (p.green > result.green) {
        result.green = p.green;
      }
      if (p.blue > result.blue) {
        result.blue = p.blue;
      }
    }
    answer += result.red * result.green * result.blue;
  }
  return answer;
}

console.log(main());

function power(pull: string) {
  const parts = pull.trim().split(", ");
  const output = { red: 0, green: 0, blue: 0 };
  for (const part of parts) {
    const [count, color] = part.split(" ");
    output[color] = +count;
  }
  return output;
}
