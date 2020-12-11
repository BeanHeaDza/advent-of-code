const { execSync } = require("child_process");

function exec(parts) {
  let prevYear = null;
  let prevDay = null;

  let dayPadding = "";
  let partPadding = "";

  if (parts.some((x) => x.year)) {
    dayPadding = "  ";
    partPadding = "    ";
  } else if (parts.some((p) => p.day !== parts[0].day)) {
    partPadding = "  ";
  }

  for (const { path, year, day, part } of parts) {
    const answer = execSync(`node ${path}`, { encoding: "utf-8" });
    if (prevYear !== year) {
      console.log("Year " + (year || "Unknown"));
    }
    if (prevDay !== day) {
      console.log(`${dayPadding}Day ${day || "Unknown"}`);
    }

    console.log(`${partPadding}Part ${part}: ${answer.trim()}`);

    prevYear = year;
    prevDay = day;
  }
}

module.exports = { exec };
