import { readInput } from "../../common";
import { combinations } from "../../common/combinations-generator";
const SEGMENTS = [
  "abcefg", // 0
  "cf", // 1
  "acdeg", // 2
  "acdfg", // 3
  "bcdf", // 4
  "abdfg", // 5
  "abdefg", // 6
  "acf", // 7
  "abcdefg", // 8
  "abcdfg", // 9
];
const LETTERS = "abcdefg";

function solve(
  sources: string[],
  outputs: string[],
  options: Map<string, Set<string>>
) {
  const optionsCheck = LETTERS.split("").map((l) => options.get(l));
  for (const picked of combinations(
    LETTERS.split(""),
    LETTERS.length,
    true,
    false
  )) {
    // Check the options
    if (optionsCheck.some((o, i) => !o.has(picked[i]))) {
      continue;
    }

    // Convert to the original mapping
    const lookup = new Map(LETTERS.split("").map((l, i) => [picked[i], l]));
    const mapLetters = (letters: string) =>
      letters
        .split("")
        .map((c) => lookup.get(c)!)
        .sort()
        .join("");
    const mappedSources = sources.map(mapLetters);
    const mappedOutputs = outputs.map(mapLetters);

    if (
      mappedSources.every((s) => SEGMENTS.includes(s)) &&
      mappedOutputs.every((o) => SEGMENTS.includes(o))
    ) {
      return +mappedOutputs.map((o) => SEGMENTS.indexOf(o) + "").join("");
    }
  }
}

function main() {
  let answer = 0;
  for (const line of readInput()) {
    const [left, right] = line.split(" | ");
    const sources = left.trim().split(" ");
    const outputs = right.trim().split(" ");

    let options = new Map(
      LETTERS.split("").map((l) => [l, new Set(LETTERS.split(""))])
    );

    //#region This whole block is just over engineering. It's a total of 5040 permutations per line, so just wait a couple of seconds instead of spending 15 minutes to optimize the code
    for (const source of [...sources, ...outputs]) {
      if (source.length === 2) {
        removeFromOthers(options, "cf", source);
      } else if (source.length === 4) {
        removeFromOthers(options, "bcdf", source);
      } else if (source.length === 3) {
        removeFromOthers(options, "acf", source);
      }
    }

    let hadChange = true;
    while (hadChange) {
      hadChange = false;
      for (const [key, option] of options) {
        if (option.size === 1) {
          hadChange = removeFromOthers(options, key, option[0]) || hadChange;
        }
      }
    }
    //#endregion

    answer += solve(sources, outputs, options);
  }
  return answer;
}

function removeFromOthers(
  options: Map<string, Set<string>>,
  original: string,
  newMapping: string
) {
  let hasRemoval = false;
  for (const [key, value] of options) {
    if (original.includes(key)) {
      continue;
    }
    for (const c of newMapping) {
      hasRemoval = value.delete(c) || hasRemoval;
    }
  }
  return hasRemoval;
}

function removeAllBut(options: Set<string>, target: string[]) {
  let hadRemoval = false;
  for (const option of options) {
    if (!target.some((t) => t === option)) {
      hadRemoval = true;
      options.delete(option);
    }
  }
  return hadRemoval;
}

console.log(main());
