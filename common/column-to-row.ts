export function columnToRow(arr: string[]): string[];
export function columnToRow<T>(arr: T[][]): T[][];
export function columnToRow(arr: any) {
  const output: any[][] = [];
  const isString = typeof arr[0][0] === "string";

  for (let x = 0; x < arr.length; x++) {
    const innerArr = arr[x];
    for (let y = 0; y < innerArr.length; y++) {
      const e = innerArr[y];
      if (!output[y]) {
        output[y] = [];
      }
      output[y][x] = e;
    }
  }

  return isString ? output.map((c) => c.join("")) : output;
}
