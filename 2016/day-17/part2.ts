import md5 from "md5";
import { readInput } from "../../common";

interface Step {
  x: number;
  y: number;
  previous: string;
}

function getNext({ x, y, previous }: Step, seed: string) {
  const steps: Step[] = [];
  const hash = md5(seed + previous);
  const isOpen = (c: string) => /[b-f]/.test(c);

  if (isOpen(hash[0])) steps.push({ x, y: y - 1, previous: previous + "U" });
  if (isOpen(hash[1])) steps.push({ x, y: y + 1, previous: previous + "D" });
  if (isOpen(hash[2])) steps.push({ x: x - 1, y, previous: previous + "L" });
  if (isOpen(hash[3])) steps.push({ x: x + 1, y, previous: previous + "R" });

  return steps.filter((s) => s.x >= 0 && s.x <= 3 && s.y >= 0 && s.y <= 3);
}

function main() {
  let [input] = readInput();

  const todo: Step[] = [{ x: 0, y: 0, previous: "" }];
  let answer: Step;
  while (todo.length) {
    answer = todo.find((s) => s.x === 3 && s.y === 3) || answer;
    for (const s of todo.splice(0).filter((s) => s.x !== 3 || s.y !== 3)) {
      todo.push(...getNext(s, input));
    }
  }

  return answer.previous.length;
}

console.log(main());
