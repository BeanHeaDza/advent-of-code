import { getAtIndexFactory } from "./get-at-index";

function main() {
  let x = 0,
    y = 0,
    charAtPos = undefined,
    trees = 0;
  const getAtIndex = getAtIndexFactory();

  do {
    charAtPos = getAtIndex(x, y);
    if (charAtPos === "#") {
      trees++;
    }
    x += 3;
    y += 1;
  } while (charAtPos !== undefined);

  return trees;
}

console.log(main());
