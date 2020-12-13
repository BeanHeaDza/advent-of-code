import { readInput } from "../../common";

function getOverLap(leftId: number, rightId: number, gap: number) {
  let left = leftId;
  let right = rightId;

  const matchLeftRight = () => {
    while (left + gap !== right) {
      if (left + gap < right) {
        left += leftId;
      } else {
        right += rightId;
      }
    }
  };

  matchLeftRight();
  const start = left;

  left += leftId;
  matchLeftRight();
  const repeat = left - start;

  return { start, repeat };
}

function mergeBusses(
  start1: number,
  repeat1: number,
  start2: number,
  repeat2: number
) {
  let left = start1;
  let right = start2;

  const matchLeftRight = () => {
    while (left !== right) {
      if (left < right) {
        const diff = right - left;
        const times = Math.floor(diff / repeat1);
        const hasRemainder = diff % repeat1 === 0;
        left += repeat1 * times;
        if (!hasRemainder) {
          left += repeat1;
        }
      } else {
        const diff = left - right;
        const times = Math.floor(diff / repeat2);
        const hasRemainder = diff % repeat2 === 0;
        right += repeat2 * times;
        if (!hasRemainder) {
          right += repeat2;
        }
      }
    }
  };

  matchLeftRight();
  const start = left;

  left += repeat1;
  matchLeftRight();
  const repeat = left - start;

  return { start, repeat };
}

function main() {
  const input = readInput();
  const buses = input[1]
    .split(",")
    .map((c, index) => ({ id: +c, index }))
    .filter((b) => !isNaN(b.id));

  const firstBus = buses[0];

  const times = buses
    .slice(1)
    .map((b) => getOverLap(firstBus.id, b.id, b.index));

  while (times.length > 1) {
    const bus1 = times.pop();
    const bus2 = times.pop();

    const newBus = mergeBusses(
      bus1.start,
      bus1.repeat,
      bus2.start,
      bus2.repeat
    );
    times.push(newBus);
  }

  return times[0].start;
}

console.log(main());
