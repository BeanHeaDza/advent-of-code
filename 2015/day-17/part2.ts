import { min } from "lodash";
import { readInput } from "../../common";

// This is such a dirty hack :(
function solve(arr: number[], target: number) {
  const combos = new Set<string>();

  function inner(from = 0, sum = 0, selected: number[] = []) {
    if (from >= arr.length) {
      return;
    }

    if (arr[from] === target - sum) {
      combos.add([...selected, from].join(","));
    }

    if (arr[from] > target - sum) {
      return;
    }

    inner(from + 1, sum, selected);

    for (let i = from + 1; i < arr.length; i++) {
      inner(i, sum + arr[from], [...selected, from]);
    }
  }

  inner();

  const lengths = [...combos.values()].map((c) => c.split(",").length);
  const minLength = min(lengths);
  return lengths.filter((l) => l === minLength).length;
}

function main() {
  const input = readInput()
    .map(Number)
    .sort((a, b) => b - a);

  return solve(input, 150);
}

console.log(main());
