import { readInput } from "../../common";

export function getDirectorySizes() {
  const input = readInput();

  const dirs = new Map<string, number>();
  dirs.set("", 0);

  let pwd = [""];

  for (const line of input) {
    if (line === "$ cd /") {
      pwd = [""];
    } else if (line === "$ ls" || line.startsWith("dir ")) {
    } else if (line.startsWith("$ cd ")) {
      const dir = line.slice(5);
      if (dir === "..") {
        pwd.pop();
      } else {
        const path = pwd[pwd.length - 1] + "/" + dir;
        pwd.push(path);
      }
    } else if (/\d+ .+/.test(line)) {
      const size = +line.split(" ")[0];
      for (const path of pwd) {
        dirs.set(path, (dirs.get(path) || 0) + size);
      }
    } else {
      throw new Error(line);
    }
  }
  return dirs;
}
