const { readInput } = require("../../common/read-file");

function main() {
  let [input] = readInput();
  const up = input.split("").filter((c) => c === "(").length;
  const down = input.length - up;
  return up - down;
}

console.log(main());
