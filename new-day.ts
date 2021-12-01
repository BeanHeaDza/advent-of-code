import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createInterface, Interface } from "readline";

const SOURCE = `import { readInput } from "../../common";

function main() {
  const input = readInput();
  return '';
}

console.log(main());
`;


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
  
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowDay = now.getDate();

  i.write(`Year? (Leave blank for ${nowYear})\n`);
  const year = await readLine(i);
  i.write(`Day? (Leave blank for ${nowDay})\n`);
  const day = await readLine(i);


  const dayDir = `${year || nowYear}/day-${day || nowDay}`;

  if (!existsSync(dayDir)) {
    mkdirSync(dayDir, { recursive: true });
  }

  writeFileSync(resolve(dayDir, "input.txt"), "");
  writeFileSync(resolve(dayDir, "part1.ts"), SOURCE);
  writeFileSync(resolve(dayDir, "part2.ts"), SOURCE);

  execSync("code " + resolve(dayDir, "part1.ts"));
  execSync("code " + resolve(dayDir, "input.txt"));

  i.close();
}

main().then();
