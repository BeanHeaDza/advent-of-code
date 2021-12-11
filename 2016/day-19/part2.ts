import { Queue } from "@datastructures-js/queue";
import { readInput } from "../../common";

function main() {
  const input = +readInput()[0];
  const left = new Queue<number>();
  const right = new Queue<number>();
  const rightStart = Math.ceil(input / 2);
  for (let i = 1; i < rightStart; i++) {
    left.enqueue(i);
  }
  for (let i = rightStart; i <= input; i++) {
    right.enqueue(i);
  }

  while (!left.isEmpty()) {
    right.dequeue();
    right.enqueue(left.dequeue());
    while (right.size() > left.size() + 1) {
      left.enqueue(right.dequeue());
    }
  }
  return right.dequeue();
}

console.log(main());
