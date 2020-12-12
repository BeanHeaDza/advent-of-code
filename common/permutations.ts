/**
 * Permutation
 * @param array Target array
 * @param num Number to combine as permutations
 * @example
 * const result = per([1, 2, 3], 2);
 * //result = [ [ 1, 2 ], [ 1, 3 ], [ 2, 1 ], [ 2, 3 ], [ 3, 1 ], [ 3, 2 ] ]
 */
export function permutations<T>(array: T[], num: number = array.length): T[][] {
  const result = [];
  if (array.length < num) return [];
  if (num === 1) {
    for (let i = 0; i < array.length; i++) {
      result[i] = [array[i]];
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      const parts = array.slice(0);
      parts.splice(i, 1)[0];
      const row = permutations(parts, num - 1);
      for (let j = 0; j < row.length; j++) {
        result.push([array[i]].concat(row[j]));
      }
    }
  }
  return result;
}
