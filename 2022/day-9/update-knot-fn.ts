export type Position = { x: number; y: number };

export function updateKnotFn(
  leader: Position,
  follower: Position,
  positionTracker?: Set<string>
) {
  return () => {
    const xDiff = leader.x - follower.x;
    const yDiff = leader.y - follower.y;
    if (xDiff === 0 && Math.abs(yDiff) > 1) {
      follower.y += clamp(yDiff);
    } else if (yDiff === 0 && Math.abs(xDiff) > 1) {
      follower.x += clamp(xDiff);
    } else if (dist(leader, follower) >= 2) {
      follower.x += clamp(xDiff);
      follower.y += clamp(yDiff);
    }
    positionTracker?.add(`${follower.x},${follower.y}`);
  };
}

function dist(head: Position, tail: Position) {
  return Math.sqrt(Math.pow(head.x - tail.x, 2) + Math.pow(head.y - tail.y, 2));
}

const clamp = (num: number) => Math.min(Math.max(num, -1), 1);
