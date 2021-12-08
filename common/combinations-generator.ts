/**
 *
 * @param array Source array (length = n)
 * @param chosen Number chosen? (r)
 * @param orderQ Is the order important?
 * @param repetitionQ Is repetition allowed?
 */
export function* combinations<T>(
  array: T[],
  chosen: number,
  orderQ = false,
  repetitionQ = false
): Generator<T[], void, undefined> {
  let stack: [number, T[]][] = [[chosen, array]];
  let found: T[] = [];
  while (stack.length > 0) {
    let [lvl, a] = stack.pop();
    found[lvl] = a[0];
    if (lvl === 1) {
      let f = [];
      for (let i = chosen; i > 0; i--) {
        f.push(found[i]);
      }
      yield f;
    }
    let b = a.slice(0);
    b.splice(0, 1);
    if (b.length > 0) {
      if (lvl > 0) stack.push([lvl, b]);
    }
    if (orderQ && !repetitionQ) {
      let c = array.slice(0);
      for (let i = chosen; i >= lvl; i--) {
        c.splice(c.indexOf(found[i]), 1);
      }
      if (c.length > 0) {
        if (lvl - 1 > 0) stack.push([lvl - 1, c]);
      }
    }
    if (orderQ && repetitionQ) {
      if (array.length > 0) {
        if (lvl - 1 > 0) stack.push([lvl - 1, array]);
      }
    }
    if (!orderQ && !repetitionQ) {
      if (b.length > 0) {
        if (lvl > 1) stack.push([lvl - 1, b]);
      }
    }
    if (!orderQ && repetitionQ) {
      if (a.length > 0) {
        if (lvl > 1) stack.push([lvl - 1, a]);
      }
    }
  }
}
