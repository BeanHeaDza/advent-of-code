import { readInput } from "../../common";

function dragon(input: string) {
  return (
    input +
    "0" +
    input
      .split("")
      .map((c) => (c === "0" ? "1" : "0"))
      .reverse()
      .join("")
  );
}

function main() {
  let [input] = readInput();
  const length = 35651584;

  while (input.length < length) {
    input = dragon(input);
  }
  input = input.slice(0, length);

  while (input.length % 2 === 0) {
    input = input
      .replace(/\d\d/g, "$& ")
      .trim()
      .split(" ")
      .map((c) => (c === "00" || c === "11" ? "1" : "0"))
      .join("");
  }
  return input;
}

console.log(main());
