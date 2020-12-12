import { readInput } from "../../common";

export function readMap() {
  const input = readInput();
  const map = new Map<string, Map<string, number>>();

  const setMap = (from: string, to: string, distance: number) => {
    const innerMap = map.get(from) || new Map<string, number>();
    innerMap.set(to, distance);

    map.set(from, innerMap);
  };

  for (const line of input) {
    const [formTo, distance] = line.split(" = ");
    const [from, to] = formTo.split(" to ");
    setMap(from, to, +distance);
    setMap(to, from, +distance);
  }

  return map;
}
