import { readInput } from "../../common";

function main() {
  const input = readInput();
  const arrivalTime = +input[0];
  const buses = input[1]
    .split(",")
    .filter((c) => c !== "x")
    .map(Number);

  const busTimes = buses.map((id) => {
    const laps = Math.floor(arrivalTime / id);
    if (laps * id === arrivalTime) {
      return { id, time: arrivalTime };
    }
    return { id, time: id * (laps + 1) };
  });

  const bus = busTimes.sort((a, b) => a.time - b.time)[0];
  const waitTime = bus.time - arrivalTime;
  return bus.id * waitTime;
}

console.log(main());
