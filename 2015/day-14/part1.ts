import { max } from "lodash";
import { readInput } from "../../common";

interface IReindeer {
  name: string;
  speed: number;
  uptime: number;
  rest: number;
}

function parseReindeers() {
  const lines = readInput();
  return lines.map<IReindeer>((line) => {
    const match = /^(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./.exec(
      line
    );

    return {
      name: match[1],
      speed: +match[2],
      uptime: +match[3],
      rest: +match[4],
    };
  });
}

function main() {
  const reindeers = parseReindeers();
  const time = 2503;

  return max(
    reindeers.map((r) => {
      const fullCycles = Math.floor(time / (r.rest + r.uptime));
      const rem = time % (r.rest + r.uptime);
      let distance = fullCycles * r.speed * r.uptime;

      if (rem >= r.uptime) {
        distance += r.speed * r.uptime;
      } else {
        distance += r.speed * rem;
      }

      return distance;
    })
  );
}

console.log(main());
