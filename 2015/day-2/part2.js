const { readInput } = require("../../common/read-file");

function main() {
  const input = readInput();

  let total = 0;
  for (const [l, w, h] of input.map((l) => l.split("x").map(Number))) {
    const wrap = (l + w + h - Math.max(l, w, h)) * 2;
    const bow = l * w * h;
    total += wrap + bow;
  }
  return total;
}

console.log(main());
