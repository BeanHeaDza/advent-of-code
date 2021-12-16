export function* get2dNeighbors(
  width: number,
  height: number,
  x: number,
  y: number,
  includeDiagonal = false
) {
  const notAgainstLeft = x > 0;
  const notAgainstTop = y > 0;
  const notAgainstRight = x < width - 1;
  const notAgainstBottom = y < height - 1;
  if (notAgainstLeft) {
    yield { x: x - 1, y };
  }
  if (notAgainstTop) {
    yield { x, y: y - 1 };
  }
  if (notAgainstRight) {
    yield { x: x + 1, y };
  }
  if (notAgainstBottom) {
    yield { x, y: y + 1 };
  }
  if (includeDiagonal) {
    if (notAgainstLeft && notAgainstTop) {
      yield { x: x - 1, y: y - 1 };
    }
    if (notAgainstRight && notAgainstTop) {
      yield { x: x + 1, y: y - 1 };
    }
    if (notAgainstLeft && notAgainstBottom) {
      yield { x: x - 1, y: y + 1 };
    }
    if (notAgainstRight && notAgainstBottom) {
      yield { x: x + 1, y: y + 1 };
    }
  }
}
