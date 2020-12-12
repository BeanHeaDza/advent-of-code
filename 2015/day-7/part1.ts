import memoizee from "memoizee";
import { readInput } from "../../common";

function evalFactory(lookup: Map<string, string>) {
  const cache = new Map();

  function evalExp(x: string): number {
    if (cache.has(x)) {
      return cache.get(x);
    }

    if (!isNaN(+x)) {
      return +x;
    }

    let value: number;

    const statement = lookup.get(x);

    const parts = statement.trim().split(" ");
    if (parts.length === 1) {
      value = evalExp(parts[0]);
    } else {
      if (parts.length === 2) {
        parts.splice(0, 0, "");
      }

      const [left, op, right] = parts;

      switch (op) {
        case "AND":
          value = evalExp(left) & evalExp(right);
          break;
        case "OR":
          value = evalExp(left) | evalExp(right);
          break;
        case "LSHIFT":
          value = evalExp(left) << +right;
          break;
        case "RSHIFT":
          value = evalExp(left) >> +right;
          break;
        case "NOT":
          value = ~evalExp(right);
          break;
        default:
          throw new Error();
      }
    }
    value = value & 65535;
    cache.set(x, +value);
    return value;
  }

  return memoizee(evalExp);
}

function main() {
  const input = readInput();
  const ops = input.map((l) => l.split(" -> ").reverse()) as [string, string][];
  const opLookup = new Map<string, string>(ops);
  const evalExp = evalFactory(opLookup);

  return evalExp("a");
}

console.log(main());
