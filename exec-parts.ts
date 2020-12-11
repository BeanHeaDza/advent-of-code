import { execSync } from "child_process";

interface Part {
  path: string;
  year: number;
  day: number;
  part: number;
}

export function exec(parts: Part[]) {
  let prevYear = null;
  let prevDay = null;

  let dayPadding = "";
  let partPadding = "";

  if (parts.some((x) => x.year !== parts[0].year)) {
    dayPadding = "  ";
    partPadding = "    ";
  } else if (parts.some((p) => p.day !== parts[0].day)) {
    partPadding = "  ";
  }

  for (let { path, year, day, part } of parts) {
    path = `out/${path.replace(/\.ts$/, ".js")}`;
    let answer = "Error!";
    try {
      answer = execSync(`node ${path}`, { encoding: "utf-8" });
    } catch {}
    if (dayPadding && prevYear !== year) {
      console.log("Year " + (year || "Unknown"));
    }
    if (partPadding && prevDay !== day) {
      console.log(`${dayPadding}Day ${day || "Unknown"}`);
    }

    console.log(`${partPadding}Part ${part}: ${answer.trim()}`);

    prevYear = year;
    prevDay = day;
  }
}
