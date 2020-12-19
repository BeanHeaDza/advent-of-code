import { readInput } from "../../common";

function main() {
  const input = readInput();
  const rules = new Map<number, string>();
  const parsedRules = new Map<number, string>();
  const strings: string[] = [];

  for (const line of input) {
    if (/^\d+:/.test(line)) {
      const [id, statement] = line.split(": ");
      rules.set(+id, statement);
    } else if (line) {
      strings.push(line);
    }
  }

  const getRule = (id: number) => {
    if (parsedRules.has(id)) {
      return parsedRules.get(id);
    }

    let p: string;

    let statement = rules.get(id);
    if (statement.startsWith('"')) {
      p = statement[1];
    } else if (statement.split("").includes("|")) {
      p =
        "(" +
        statement
          .split(" | ")
          .map((s) => s.split(" ").map(Number).map(getRule).join(""))
          .join("|") +
        ")";
    } else {
      p = statement.split(" ").map(Number).map(getRule).join("");
    }

    parsedRules.set(id, p);
    return p;
  };

  const regex = new RegExp(`^${getRule(0)}$`);

  return strings.filter((s) => regex.test(s)).length;
}

console.log(main());
