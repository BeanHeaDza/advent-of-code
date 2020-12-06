const { readInput } = require("./read-input");

function main() {
  const input = readInput();

  const output = [];

  let current = new Map();
  let lineCount = 0;

  for (const line of input) {
    if (line === "") {
      const answers = [];

      for (const [key, value] of current) {
        if (value === lineCount) {
          answers.push(key);
        }
      }

      output.push(answers);
      lineCount = 0;
      current = new Map();
    } else {
      for (const answer of line.split("")) {
        current.set(answer, (current.get(answer) || 0) + 1);
      }
      lineCount++;
    }
  }


  return output.map(i => i.length).reduce((sum, v) => sum + v, 0);
}

console.log("Part 2:", main());
