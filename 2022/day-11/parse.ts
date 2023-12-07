import { readInput } from "../../common";

export class Monkey {
  inspections = 0;
  lcmAllDTN: number;
  private operationFn: (old: number) => number;
  constructor(
    private readonly monkeys: Monkey[],
    private readonly items: number[],
    operation: string,
    private readonly divisableTestNumber: number,
    private readonly trueTarget: number,
    private readonly falseTarget: number,
    private readonly divideBy3: boolean
  ) {
    this.operationFn = new Function(
      "old",
      `let ${operation.replace("new", "n")}; return n`
    ) as any;
  }

  inspect() {
    let [worry] = this.items.splice(0, 1);

    while (typeof worry === "number") {
      this.inspections++;
      worry = this.operationFn(worry);
      if (this.divideBy3) {
        worry = Math.floor(worry / 3);
      }
      this.monkeys[
        worry % this.divisableTestNumber === 0
          ? this.trueTarget
          : this.falseTarget
      ].items.push(worry);

      [worry] = this.items.splice(0, 1);
    }
  }
}

export function parse(divideBy3 = true) {
  const input = readInput().join("\n");
  const monkeys: Monkey[] = [];

  const regex =
    /Monkey \d+:\n  Starting items: ([0-9, ]+)\n  Operation: (.+)\n  Test: divisible by (\d+)\n\s+If true: throw to monkey (\d+)\n\s+If false: throw to monkey (\d+)/g;

  let match: RegExpExecArray;
  while ((match = regex.exec(input))) {
    monkeys.push(
      new Monkey(
        monkeys,
        match[1].split(",").map(Number),
        match[2],
        +match[3],
        +match[4],
        +match[5],
        divideBy3
      )
    );
  }

  return monkeys;
}
