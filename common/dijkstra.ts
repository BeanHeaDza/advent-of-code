import {
  MinPriorityQueue,
  PriorityQueueItem,
} from "@datastructures-js/priority-queue";

export function dijkstra<T>(
  start: T,
  end: T,
  getConnected: (n: T) => [T, number][] | Generator<[T, number]>
): number {
  const queue = new MinPriorityQueue<T>();
  queue.enqueue(start, 0);
  let answer = Number.POSITIVE_INFINITY;
  const doneNodes = new Set<T>();
  while (queue.size()) {
    const { element, priority } = queue.dequeue() as PriorityQueueItem<T>;
    if (doneNodes.has(element)) {
      continue;
    }
    doneNodes.add(element);
    if (priority > answer) {
      break;
    }

    for (const [next, dist] of getConnected(element)) {
      if (doneNodes.has(next)) {
        continue;
      }
      const newPriority = dist + priority;

      if (next === end) {
        answer = answer > newPriority ? newPriority : answer;
        continue;
      }
      queue.enqueue(next, newPriority);
    }
  }
  return answer;
}
