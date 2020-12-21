import { countBy } from "lodash";
import { readInput } from "../../common";

interface Recipe {
  ingredients: string[];
  allergens: string[];
}

function parseInput(lines: string[]) {
  const recipes: Recipe[] = [];

  for (const line of lines) {
    const [left, right] = line.split(" (contains ");
    const ingredients = left.split(" ");
    const allergens = right.substr(0, right.length - 1).split(", ");
    recipes.push({ ingredients, allergens });
  }

  return recipes;
}

function removeAllergen(
  al: string,
  ing: string,
  alMap: Map<string, string[][]>,
  alMap2: Map<string, {}>
) {
  alMap.delete(al);
  for (const v of alMap2.values()) {
    delete v[ing];
  }
  alMap2.delete(al);
}

function main() {
  const input = readInput();
  const recipes = parseInput(input);
  const ingredients = countBy(
    recipes
      .map((r) => r.ingredients.join(","))
      .join(",")
      .split(",")
  );
  const link = {};

  const alMap = new Map<string, string[][]>();

  for (const r of recipes) {
    for (const al of r.allergens) {
      const currentList = alMap.get(al) || [];
      currentList.push(r.ingredients);
      alMap.set(al, currentList);
    }
  }

  const alMap2 = new Map<string, {}>();
  for (const [key, value] of alMap.entries()) {
    const arr: string[] = [];
    for (const v of value) {
      arr.push(...v);
    }

    const count = countBy(arr);
    alMap2.set(key, count);
  }

  let moved = true;
  while (moved) {
    moved = false;

    for (const key of alMap.keys()) {
      const len = alMap.get(key).length;
      const count = alMap2.get(key);
      const matches = Object.keys(count).filter((k) => count[k] === len);
      if (matches.length === 1) {
        moved = true;
        delete ingredients[matches[0]];
        link[matches[0]] = key;
        removeAllergen(key, matches[0], alMap, alMap2);
      }
    }

    for (const key of alMap2.keys()) {
      const count = alMap2.get(key);
      const keys = Object.keys(count);
      if (keys.length === 1) {
        moved = true;
        delete ingredients[keys[0]];
        link[keys[0]] = key;
        removeAllergen(key, keys[0], alMap, alMap2);
      }
    }
  }

  const ans = Object.keys(link)
    .map((k) => ({ k, al: link[k] }))
    .sort((a, b) => a.al.localeCompare(b.al))
    .map((x) => x.k)
    .join(",");

  return ans;
}

console.log(main());
