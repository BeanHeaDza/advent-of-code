import { readInput } from "../../common";

function main() {
  const input = readInput();
  const links = new Map<string, string[]>();
  const add = (a: string, b: string) => {
    if (b === "start") {
      return;
    }
    const arr = links.get(a) || [];
    if (!arr.length) {
      links.set(a, arr);
    }
    arr.push(b);
  };
  for (const path of input) {
    const [left, right] = path.split("-");
    add(left, right);
    add(right, left);
  }

  const paths = new Set<string>();
  for (const path of solve2(links)) {
    paths.add(path.join("-"));
  }

  return paths.size;
}

console.log(main());

function* solve2(links: Map<string, string[]>) {
  for (const key of links.keys()) {
    if (key.toLowerCase() === key && key !== "end") {
      yield* solve(links, undefined, key);
    }
  }
}

function* solve(
  links: Map<string, string[]>,
  path = ["start"],
  pickedSmall: string
): Generator<string[]> {
  const current = path[path.length - 1];
  if (current === "end") {
    yield path;
  }
  for (const link of links.get(current) || []) {
    if (/^[A-Z]+$/.test(link)) {
      yield* solve(links, [...path, link], pickedSmall);
    } else if (link !== pickedSmall && !path.includes(link)) {
      yield* solve(links, [...path, link], pickedSmall);
    } else if (
      link === pickedSmall &&
      path.filter((p) => p === link).length < 2
    ) {
      yield* solve(links, [...path, link], pickedSmall);
    }
  }
}
