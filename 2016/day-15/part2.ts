import { readInput } from "../../common";

class Disc {
  constructor(public readonly start: number, public readonly loop: number) {}
  static parse(line: string): Disc {
    const id = +line.match(/#(\d+)/)[1];
    const loop = +line.match(/(\d+) positions/)[1];
    let start = +line.match(/(\d+)\./)[1];

    start = loop - ((start + id) % loop);

    return new Disc(start, loop);
  }
}

function mergeDiscs(d1: Disc, d2: Disc): Disc {
  let left = d1.start;
  let right = d2.start;
  const matchDiscs = () => {
    while (left !== right) {
      if (left < right) {
        left += d1.loop;
      } else {
        right += d2.loop;
      }
    }
  };

  matchDiscs();
  const start = left;

  left += d1.loop;
  matchDiscs();

  return new Disc(start, left - start);
}

function main() {
  const input = readInput().map(Disc.parse);
  input.push(Disc.parse(`#${input.length + 1} 11 positions 0.`));
  while (input.length > 1) {
    const [d1, d2] = input.splice(0, 2);
    input.push(mergeDiscs(d1, d2));
  }
  return input[0].start;
}

console.log(main());
