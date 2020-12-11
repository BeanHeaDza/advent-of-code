const { readInput } = require("../../common/read-file");

function evalFactory(lookup) {
  const cache = new Map();
  function eval(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }

    if (!isNaN(x)) {
      return +x;
    }

    let value;

    const statement = lookup.get(x);

    const parts = statement.trim().split(" ");
    if (parts.length === 1) {
      value = eval(parts[0]);
    } else {
      if (parts.length === 2) {
        parts.splice(0, 0, "");
      }

      const [left, op, right] = parts;

      switch (op) {
        case "AND":
          value = eval(left) & eval(right);
          break;
        case "OR":
          value = eval(left) | eval(right);
          break;
        case "LSHIFT":
          value = eval(left) << +right;
          break;
        case "RSHIFT":
          value = eval(left) >> +right;
          break;
        case "NOT":
          value = ~eval(right);
          break;
        default:
          throw new Error("Broken!");
      }
    }
    value = value & 65535;
    cache.set(x, +value);
    return value;
  }
  return eval;
}

function main() {
  const input = readInput();
  const ops = input.map((l) => l.split(" -> ").reverse());
  const opLookup = new Map(ops);
  const a = evalFactory(opLookup)("a");
  opLookup.set("b", "" + a);

  return evalFactory(opLookup)("a");
}

console.log(main());
