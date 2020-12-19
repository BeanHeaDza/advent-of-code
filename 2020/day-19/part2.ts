import { readInput } from "../../common";

function getRule11(r42: string, r31: string, text: string) {
  let iter = 1;
  while (new RegExp(`(${r42.repeat(iter)}${r31.repeat(iter)})`).test(text)) {
    iter++;
  }

  let rule = "(";
  for (let i = iter; i >= 1; i--) {
    rule += `(${r42.repeat(i)}${r31.repeat(i)})|`;
  }
  rule = rule.substr(0, rule.length - 1);

  return rule + ")";
}

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
    if (id === 11) {
      p = getRule11(getRule(42), getRule(31), strings.join(" "));
    } else if (statement.startsWith('"')) {
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
      if (id === 8) {
        p = `(${p})+`;
      }
    }

    parsedRules.set(id, p);
    return p;
  };

  const regex = new RegExp(`^${getRule(0)}$`);

  return strings.filter((s) => regex.test(s)).length;
}

console.log(main());
