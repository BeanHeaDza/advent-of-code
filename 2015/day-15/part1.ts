import { countBy } from "lodash";
import { readInput } from "../../common";
import { combinationsRepeat } from "../../common/combinations";

interface Ingredient {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
}

function parseIngredients() {
  const input = readInput();
  const output = new Map<string, Ingredient>();

  for (const line of input) {
    const [name, props] = line.split(":");
    const objString = `{${props.replace(/[^ \d-,]+/g, '"$&":')}}`;
    const obj = JSON.parse(objString);
    delete obj.calories;
    output.set(name.trim(), obj);
  }

  return output;
}

function main() {
  const ingredients = parseIngredients();
  let answer = 0;
  for (const grouping of combinationsRepeat([...ingredients.keys()], 100)) {
    const quantities = countBy(grouping);
    const properties = new Map<string, number>();

    for (const name of Object.keys(quantities)) {
      const ingredient = ingredients.get(name);
      for (const prop of Object.keys(ingredient)) {
        let value = properties.get(prop) || 0;
        value += ingredient[prop] * quantities[name];
        properties.set(prop, value);
      }
    }
    if ([...properties.values()].some((x) => x <= 0)) {
      continue;
    }

    const score = [...properties.values()].reduce(
      (product, value) => product * value,
      1
    );

    if (score > answer) {
      answer = score;
    }
  }

  return answer;
}

console.log(main());
