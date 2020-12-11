import { execSync } from "child_process";
import { exec } from "./exec-parts";

const paths = execSync("git status -s -uall", { encoding: "utf-8" });
const parts = paths
  .split("\n")
  .map((p) => /(?:\?\?| M) ((\d{4})?\/?day-(\d+)\/part(1|2)\.ts)\b/.exec(p))
  .filter((p) => p)
  .map((p) => ({
    path: p[1],
    year: p[2] ? +p[2] : null,
    day: +p[3],
    part: +p[4],
  }));

exec(parts);
