import { readInput } from "../../common";

const props = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function main() {
  const input = readInput().map((i) => {
    const sue = i.replace(/^Sue (\d+): .*/, "$1");
    i = i.substr(6 + sue.length);
    const attributes = JSON.parse(
      "{" + i.replace(/Sue \d+: /, "").replace(/[^ \d-,:]+/g, '"$&"') + "}"
    );

    return { id: +sue, attributes };
  });

  return input.filter((s) =>
    Object.keys(s.attributes).every((k) => s.attributes[k] === props[k])
  )[0].id;
}

console.log(main());
