import { readInput } from "../../common";

class Output {
  constructor(private readonly id: number) {}
  content: number[] = [];
  give(value: number) {
    this.content.push(value);
  }
}

class Bot {
  hands: number[] = [];
  constructor(private readonly id: number) {}
  low: { give: (value: number) => void };
  high: { give: (value: number) => void };

  give(value: number) {
    this.hands.push(value);
    if (this.hands.length > 1) {
      const [low, high] = this.hands.sort((a, b) => a - b);
      this.low.give(low);
      this.high.give(high);
      this.hands = [];
    }
  }
}

function main() {
  const input = readInput();
  const bots = new Map<number, Bot>();
  const outputs = new Map<number, Output>();

  const getBot = (id: number) => {
    let bot = bots.get(id);
    if (!bot) {
      bot = new Bot(id);
      bots.set(id, bot);
    }
    return bot;
  };
  const getOutput = (id: number) => {
    let output = outputs.get(id);
    if (!output) {
      output = new Output(id);
      outputs.set(id, output);
    }
    return output;
  };

  for (const line of input.filter((l) => l.startsWith("bot"))) {
    let m = /bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/.exec(
      line
    );

    const id = +m[1];
    const lowType = m[2];
    const lowId = +m[3];
    const highType = m[4];
    const highId = +m[5];

    const bot = getBot(id);
    bot.low = lowType === "bot" ? getBot(lowId) : getOutput(lowId);
    bot.high = highType === "bot" ? getBot(highId) : getOutput(highId);
  }

  for (const line of input.filter((l) => l.startsWith("value"))) {
    const parts = line.split(" ");
    bots.get(+parts[5]).give(+parts[1]);
  }

  return (
    outputs.get(0).content[0] *
    outputs.get(1).content[0] *
    outputs.get(2).content[0]
  );
}

console.log(main());
