function rec(n: number, k: number): number[][] {
  if (k === 0) return [[]];
  const result = [];
  for (let i = 0; i < n; i++) {
    if (n - i - 1 < k - 1) continue;
    rec(n - i - 1, k - 1).forEach((js) => {
      result.push([i, ...js.map((j) => j + i + 1)]);
    });
  }
  return result;
}

/**
 * Combination
 * @param array Target array
 * @param num Number to combine
 * @return Return all combinations
 * @example
 * const result = com([1,2,3],2);
 * //result = [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]
 */
export function combinations<T>(array: T[], num: number): T[][] {
  const last = rec(array.length, num);
  const combos: T[][] = [];
  for (let ite = 0; ite < last.length; ite++) {
    const combo: T[] = [];
    for (let fin = 0; fin < last[ite].length; fin++) {
      combo.push(array[last[ite][fin]]);
    }
    combos.push(combo);
  }
  return combos;
}
