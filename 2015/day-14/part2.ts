import { max } from "lodash";
import { readInput } from "../../common";

interface IReindeer {
  name: string;
  speed: number;
  uptime: number;
  rest: number;
  cycle: number;
  score: number;
  distance: number;
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
      cycle: +match[3] + +match[4],
      score: 0,
      distance: 0,
    };
  });
}

function main() {
  const reindeers = parseReindeers();
  const maxTime = 2503;
  for (let time = 0; time <= maxTime; time++) {
    for (const reindeer of reindeers) {
      const rem = time % reindeer.cycle;
      if (rem < reindeer.uptime) {
        reindeer.distance += reindeer.speed;
      }
    }

    const leader = max(reindeers.map((r) => r.distance));
    for (const reindeer of reindeers.filter((r) => r.distance === leader)) {
      reindeer.score++;
    }
  }

  return max(reindeers.map((r) => r.score));
}

console.log(main());
