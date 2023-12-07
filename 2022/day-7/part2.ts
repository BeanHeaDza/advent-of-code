import { min } from "lodash";
import { getDirectorySizes } from "./get-directory-sizes";

function main() {
  const dirs = getDirectorySizes();

  const totalSize = 70000000;
  const neededSize = 30000000;
  const usedSize = dirs.get("");
  const requiredToClear = usedSize - totalSize + neededSize;
  return min(Array.from(dirs.values()).filter((s) => s >= requiredToClear));
}

console.log(main());
