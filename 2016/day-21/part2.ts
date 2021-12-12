import { readInput } from "../../common";

const PASSWORD = "fbgdceah";

const REVERSE = new Map(
  PASSWORD.split("")
    .map((_, i) => [i >= 4 ? i + i + 2 : i + i + 1, i])
    .map(([k, v]) => [k % PASSWORD.length, v])
);

const RULES: [RegExp, (match: RegExpMatchArray, pw: string) => string][] = [];

function rotateLeft(s: string, c: number) {
  return s.substring(c) + s.substring(0, c);
}

function rotateRight(s: string, c: number) {
  if (c >= s.length) {
    c = c % s.length;
  }
  return s.substring(s.length - c) + s.substring(0, s.length - c);
}

function setupRules() {
  RULES.push([
    /swap position (\d+) with position (\d+)/,
    (m, w) => {
      const [x, y] = m
        .slice(1)
        .map(Number)
        .sort((a, b) => a - b);
      return [
        w.slice(0, x),
        w[y],
        w.slice(x + 1, y),
        w[x],
        w.slice(y + 1),
      ].join("");
    },
  ]);
  RULES.push([
    /swap letter (\w) with letter (\w)/,
    (m, w) => {
      let [x, y] = [w.indexOf(m[1]), w.indexOf(m[2])].sort((a, b) => a - b);
      return [
        w.slice(0, x),
        w[y],
        w.slice(x + 1, y),
        w[x],
        w.slice(y + 1),
      ].join("");
    },
  ]);
  RULES.push([
    /rotate (left|right) (\d+) steps?/,
    (m, w) => {
      if (m[1] === "left") {
        return rotateRight(w, +m[2]);
      } else {
        return rotateLeft(w, +m[2]);
      }
    },
  ]);
  RULES.push([
    /rotate based on position of letter (\w)/,
    (m, w) => {
      const i = w.indexOf(m[1]);
      const rev = REVERSE.get(i);
      return rev > i ? rotateRight(w, rev - i) : rotateLeft(w, i - rev);
    },
  ]);
  RULES.push([
    /reverse positions (\d+) through (\d+)/,
    (m, w) => {
      const [x, y] = m
        .slice(1)
        .map(Number)
        .sort((a, b) => a - b);
      return [
        w.substring(0, x),
        w
          .substring(x, y + 1)
          .split("")
          .reverse()
          .join(""),
        w.substring(y + 1),
      ].join("");
    },
  ]);
  RULES.push([
    /move position (\d+) to position (\d+)/,
    (m, w) => {
      const arr = w.split("");
      const [c] = arr.splice(+m[2], 1);
      arr.splice(+m[1], 0, c);
      return arr.join("");
    },
  ]);
}

function main() {
  let password = PASSWORD;
  setupRules();
  const input = readInput();
  for (const rule of input.reverse()) {
    for (const [regex, fn] of RULES) {
      const m = regex.exec(rule);
      if (m) {
        password = fn(m, password);
      }
    }
  }
  return password;
}

console.log(main());
