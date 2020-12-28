import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createInterface, Interface } from "readline";

// existsSync('')
function readLine(i: Interface) {
  return new Promise<string>((resolve, reject) => {
    const lineCb = (line: string) => {
      resolve(line);
      i.removeListener("close", reject);
    };
    i.once("line", lineCb);
    i.once("close", reject);
  });
}

async function main() {
  const i = createInterface({ input: process.stdin, output: process.stdout });

  i.write("Year?\n");
  const year = await readLine(i);
  i.write("Day?\n");
  const day = await readLine(i);

  const now = new Date();

  const dayDir = `${year || now.getFullYear()}/day-${day || now.getDate()}`;

  if (!existsSync(dayDir)) {
    mkdirSync(dayDir, { recursive: true });
  }

  writeFileSync(resolve(dayDir, "input.txt"), "");
  writeFileSync(resolve(dayDir, "part1.ts"), "export {};");
  writeFileSync(resolve(dayDir, "part2.ts"), "export {};");

  execSync("code " + resolve(dayDir, "part1.ts"));
  execSync("code " + resolve(dayDir, "input.txt"));

  i.close();
}

main().then();
