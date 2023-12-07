import { sum } from "lodash";
import { getDirectorySizes } from "./get-directory-sizes";

function main() {
  const dirs = getDirectorySizes();

  return sum(Array.from(dirs.values()).filter((v) => v <= 100000));
}

console.log(main());
