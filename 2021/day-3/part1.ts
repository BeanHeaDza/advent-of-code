import { readInput } from "../../common";

function main() {
  const input = readInput();
  const counts = [];
  for (const arr of input) {
    const parts = arr.split("");
    for (let i = 0; i < parts.length; i++) {
      const element = parts[i];
      counts[i] = (counts[i] || 0) + (element === "1" ? 1 : -1);
    }
  }

  const first = counts.map((x) => (x > 0 ? "1" : "0")).join("");
  const second = counts.map((x) => (x > 0 ? "0" : "1")).join("");

  return parseInt(first, 2) * parseInt(second, 2);
}

console.log(main());
