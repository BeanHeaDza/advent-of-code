const { getAtIndexFactory } = require("./get-at-index");

function traverseTrees(getAtIndex, xInc, yInc) {
  let x = 0,
    y = 0,
    charAtPos = undefined,
    trees = 0;

  do {
    charAtPos = getAtIndex(x, y);
    if (charAtPos === "#") {
      trees++;
    }
    x += xInc;
    y += yInc;
  } while (charAtPos !== undefined);

  return trees;
}

function main() {
  let answer = 1;
  const getAtIndex = getAtIndexFactory();

  answer *= traverseTrees(getAtIndex, 1, 1);
  answer *= traverseTrees(getAtIndex, 3, 1);
  answer *= traverseTrees(getAtIndex, 5, 1);
  answer *= traverseTrees(getAtIndex, 7, 1);
  answer *= traverseTrees(getAtIndex, 1, 2);

  return answer;
}

console.log("Part 2:", main());
