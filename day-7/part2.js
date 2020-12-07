const { readInput } = require("./read-input");

function getBagContains(line) {
  const bagMatch = /^(.*?) bags contain/.exec(line);
  line = line.substr(bagMatch[0].length);

  if (line === " no other bags.") {
    return {
      bag: bagMatch[1],
      contains: [],
    };
  }

  const re = /,? (\d+) (.*?) bags?/g;
  let match = re.exec(line);
  const contains = [];
  while (match) {
    contains.push({ color: match[2], count: +match[1] });
    match = re.exec(line);
  }
  return {
    bag: bagMatch[1],
    contains,
  };
}

function getBagCountFactory(bags) {
  const lookup = new Map();

  return function getBagCount(color) {
    if (lookup.has(color)) {
      return lookup.get(color);
    }

    const bag = bags.find(({ bag }) => bag === color);
    let count = 0;

    if (bag.contains.length > 0) {
      for (const containedBag of bag.contains) {
        count += (getBagCount(containedBag.color) + 1) * containedBag.count;
      }
    }

    lookup.set(color, count);
    return count;
  };
}

function main() {
  const input = readInput();
  const bags = input.map(getBagContains);
  const getBagCount = getBagCountFactory(bags);

  return getBagCount("shiny gold");
}

console.log("Part 2:", main());
