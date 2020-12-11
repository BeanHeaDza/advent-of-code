const { readInput } = require("../../common/read-file");

function main() {
  let [input] = readInput();

  let floor = 0;
  for (let x = 0; x < input.length; x++) {
    if (input[x] === "(") {
      floor++;
    } else {
      floor--;
      if (floor < 0) {
        return x + 1;
      }
    }
  }
}

console.log(main());
